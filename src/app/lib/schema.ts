import mongoose, { Document, Model, Schema } from "mongoose";

interface IReferredUser {
  userId: mongoose.Types.ObjectId;
  name: string;
  referredAt: Date;
}

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
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

const validateNigerianPhoneNumber = (value: string) => {
  const nigerianPhoneRegex = /^(0|234|\+234)[789][01]\d{8}$/;
  return nigerianPhoneRegex.test(value);
};

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
      validate: {
        validator: (v: string) => /^[a-zA-Z0-9_]+$/.test(v),
        message: "Username can only contain letters, numbers, and underscores",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateNigerianPhoneNumber,
        message:
          "Please enter a valid Nigerian phone number (e.g., 07000000000, +2347000000000)",
      },
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
    const randomBytes = new Uint8Array(2);
    crypto.getRandomValues(randomBytes);
    const hexString = Array.from(randomBytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    return `${baseCode}${hexString}`;
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

const sessionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    default: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

export const SessionModel =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

const verificationTokenSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true,
  },
  type: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const VerificationTokenModel =
  mongoose.models.VerificationToken ||
  mongoose.model("VerificationToken", verificationTokenSchema);
