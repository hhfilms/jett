import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jett Lopez",
  description: "My football stats and articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
