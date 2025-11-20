import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Renan Lavirotte | Full-Stack Developer & Leader",
  description: "Portfolio of Renan Lavirotte - Collaborative leader, full-stack developer, and Computer Science student at University of Durham. Showcasing projects in robotics, web development, and research.",
  keywords: ["Renan Lavirotte", "Full-Stack Developer", "Portfolio", "Computer Science", "Durham University", "Web Development", "Robotics"],
  authors: [{ name: "Renan Lavirotte" }],
  openGraph: {
    title: "Renan Lavirotte | Full-Stack Developer & Leader",
    description: "Portfolio showcasing projects in robotics, web development, and research",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

