import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Heart } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlogApp - Modern CMS",
  description: "A technical test blog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-12 md:py-16">
              {children}
            </main>
            <footer className="border-t border-border bg-card/50 mt-20 py-12">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-foreground">BlogApp</h3>
                    <p className="text-sm text-muted-foreground">
                      A modern platform for technical writers to create and share their stories.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Product</h4>
                    <ul className="space-y-1 text-sm">
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Company</h4>
                    <ul className="space-y-1 text-sm">
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Legal</h4>
                    <ul className="space-y-1 text-sm">
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
                      <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} BlogApp. All rights reserved.
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-4 md:mt-0">
                    Made with <Heart className="w-4 h-4 text-red-500" /> by the BlogApp team
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}