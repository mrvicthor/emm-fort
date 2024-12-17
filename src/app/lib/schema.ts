import mongoose, { Document, Model, Schema } from "mongoose";
import crypto from "crypto";

interface IReferredUser {
  userId: mongoose.Types.ObjectId;
  name: string;
  referredAt: Date;
}

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  tier: string;
  personalReferralCode: string;
  referredBy: string | null;
  referredUsers: IReferredUser[];
  createdAt: Date;
}

interface IUserModel extends Model<IUser> {
  generateUniqueReferralCode(username: string): Promise<string>;
}

const ReferredUserSchema = new Schema<IReferredUser>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    referredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);
const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
    },
    personalReferralCode: {
      type: String,
      required: true,
      unique: true,
    },
    referredBy: {
      type: String,
      required: false,
      default: null,
    },
    referredUsers: [ReferredUserSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// method to generate unique referral code
userSchema.statics.generateUniqueReferralCode = async function (
  username: string
): Promise<string> {
  const generateCode = () => {
    const baseCode = username.slice(0, 6).toUpperCase();
    const randomPart = crypto.randomBytes(2).toString("hex").toUpperCase();
    return `${baseCode}${randomPart}`;
  };

  let referralCode: string = "";
  let isUnique = false;
  while (!isUnique) {
    referralCode = generateCode();
    const existingUser = await this.findOne({
      personalReferralCode: referralCode,
    });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return referralCode;
};

// Pre-save middleware
userSchema.pre("save", async function (next) {
  // Generate personal referral code only for new users
  if (this.isNew && !this.personalReferralCode) {
    this.personalReferralCode = await (
      this.constructor as IUserModel
    ).generateUniqueReferralCode(this.username);
  }

  // Handle referred by logic
  if (this.isNew && this.referredBy) {
    try {
      // Find the user who owns this referral code
      const referrer = await this.model("User").findOne({
        personalReferralCode: this.referredBy,
      });

      if (referrer) {
        // Add this new user to the referrer's referred users list
        await this.model("User").updateOne(
          { _id: referrer._id },
          {
            $push: {
              referredUsers: {
                userId: this._id,
                name: this.name,
              },
            },
          }
        );
      }
    } catch (error) {
      console.error("Error processing referral", error);
    }
  }
  next();
});

// validation to ensure referall code exists if provided
userSchema.path("referralCode").validate(async function (value) {
  if (value) {
    const user = await this.model("User").findOne({
      personalReferralCode: value,
    });
    return !!user;
  }
  return true;
}, "Invalid referral code");

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
