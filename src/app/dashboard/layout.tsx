import { withAuth } from "@/middleware/withAuth";
import { ThemeProvider } from "next-themes";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Await the withAuth result
  await withAuth();
  
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
    >
      {children}
    </ThemeProvider>
  );
}
