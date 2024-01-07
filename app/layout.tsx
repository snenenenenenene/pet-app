import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import AccountPopUp from "./components/accountPopUp";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PawFinder",
  description: "Pet application",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  authors: [
    { name: "Senne Bels" },
    {
      name: "Senne Bels",
      url: "https://www.linkedin.com/in/sennebels/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "cat.svg" },
    { rel: "icon", url: "cat.svg" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#EE8E77",
};

export default function RootLayout({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-light-light font-sniglet flex-col flex h-screen w-screen text-light-dark overflow-hidden">
          {/* <Navbar /> */}
          <AccountPopUp />
          <div className="h-full w-full flex justify-center overflow-x-hidden">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
