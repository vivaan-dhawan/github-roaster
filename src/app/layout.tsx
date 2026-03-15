import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub Roaster 🔥",
  description: "AI-powered brutal roasts for your GitHub profile. Enter a username and watch AI destroy their coding ego.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0a] text-white min-h-screen relative overflow-x-hidden`}>
        {/* Animated Fire Particles Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-[#0a0a0a]/80 to-[#0a0a0a]" />
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-500 rounded-full animate-fire-particle"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-10px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                filter: 'blur(2px)'
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
            {children}
          </main>
          
          <footer className="w-full text-center py-8 text-zinc-500 text-sm">
            <p>Built with 🔥 by <a href="https://github.com/VIVAAN-DHAWAN" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors">VIVAAN-DHAWAN</a></p>
          </footer>
        </div>
      </body>
    </html>
  );
}
