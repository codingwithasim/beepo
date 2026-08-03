import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ClarityAnalytics } from "@/components/analytics/clarity-analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next"
import { JsonLd } from "@/components/seo/json-ld";
import { createRootStructuredData, rootMetadata } from "@/lib/seo";

const inter = Inter({subsets:['latin'],variable:'--font-sans', display: "swap"});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,

  themeColor: [
    {
      media:
        "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media:
        "(prefers-color-scheme: dark)",
      color: "#09090b",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", inter.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd
          id="chrona-structured-data"
          data={createRootStructuredData()}
        />
        
        <SidebarProvider>
          <TooltipProvider delay={1000}>
            <ThemeProvider>
              {children}
              <VercelAnalytics/>
              <ClarityAnalytics/>
            </ThemeProvider>            
          </TooltipProvider>
        </SidebarProvider>
        </body>
    </html>
  );
}
