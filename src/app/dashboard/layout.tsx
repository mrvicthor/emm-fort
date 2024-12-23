export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container py-[3vh]">
      <div className=" dashboard gap-4">{children}</div>
    </section>
  );
}
