import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indoor Golf Denver NC | Hacker’s House Golf Club",
  description: "A modern indoor golf clubhouse planned for western Lake Norman, built for focused practice, easygoing competition, events, and hospitality.",
  icons: { icon: "/assets/images/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
