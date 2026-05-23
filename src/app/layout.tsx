import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Arpit Sharma | Portfolio — AI/ML Enthusiast & Full Stack Developer",
  description:
    "Portfolio of Arpit Sharma — BTech CS(AIML) student, AI/ML enthusiast, and full-stack developer. Explore projects, skills, and experience in machine learning, web development, and open source.",
  keywords: [
    "Arpit Sharma",
    "Portfolio",
    "AI/ML",
    "Full Stack Developer",
    "BTech",
    "Computer Science",
    "Machine Learning",
    "React",
    "Next.js",
    "Python",
    "Java",
  ],
  authors: [{ name: "Arpit Sharma" }],
  creator: "Arpit Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Arpit Sharma | Portfolio",
    description:
      "BTech CS(AIML) Student | AI/ML Enthusiast | Full Stack Developer",
    siteName: "Arpit Sharma Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpit Sharma | Portfolio",
    description:
      "BTech CS(AIML) Student | AI/ML Enthusiast | Full Stack Developer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col noise">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
