import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container py-[3vh]">
      <div className="grid dashboard gap-4">
        <Sidebar />
        {children}
      </div>
    </section>
  );
}
