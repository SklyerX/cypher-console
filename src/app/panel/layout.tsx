import DashboardNav from "@/components/misc/DashboardNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DashboardNav />
        <main className="mt-16">{children}</main>
      </body>
    </html>
  );
}
