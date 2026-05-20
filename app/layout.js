import { Jost, Plus_Jakarta_Sans, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import SmoothScroll from "@/components/smoothScroll";
import Providers from "./provider/providers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata = {
  title: "Travel Hooks - Premium Travel & Umrah Packages",
  description: "Book 5-star Umrah experiences, dynamic holiday packages, and worldwide flights.",
  /* Popular and high-traffic keywords for SEO */
  keywords: [
    // Umrah Specific Keywords
    "Luxury Umrah packages",
    "5 Star Ramadan Umrah package",
    "Budget Umrah travel agency",
    "Premium Makkah and Madinah hotels",
    "Cheap Umrah packages from UK",
    "Umrah visa and transport",
    
    // Flight  Keywords
    "Book worldwide flights",
    "Cheap flights to Jeddah",
    "London to Madinah flights",
    "Best flight deals online",
    "Direct flights search engine",
    
    // Holiday  Keywords
    "Premium European holiday packages",
    "Best holiday destinations deals",
    "Luxury travel experiences",
    "Custom travel itinerary planner",
    "All inclusive holiday packages",
    
    // Brand
    "Travel Hooks",
    "Travel Hooks flight booking",
    "Travel Hooks Umrah"
  ],
};


export default function RootLayout({ children }) {
  return (
    /* Fix 1: suppressHydrationWarning add kiya takay browser extensions ya dark mode theme crash na kare */
    <html lang="en" className={`${jakarta.variable} ${mulish.variable} ${jost.variable}`} suppressHydrationWarning>
      <body className="bg-white dark:bg-[#01080C] text-slate-900 dark:text-white antialiased">
        
        {/* Fix 2: Providers ko top par rakha takay Header aur SmoothScroll dono ko state/theme ka access mile */}
        <Providers>
          <SmoothScroll>
            <Header />
            <main>
              {children}
            </main>
          </SmoothScroll>
        </Providers>

      </body>
    </html>
  );
}
