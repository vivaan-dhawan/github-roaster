import { Copy, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoastCard({ roast, username }: { roast: string, username: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`GitHub Roast for @${username}:\n\n${roast}\n\n🔥 Get roasted at: [YOUR_SITE_URL]`);
    alert('Copied to clipboard!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="glass-panel w-full mx-auto rounded-3xl overflow-hidden relative group"
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff4500]/20 via-transparent to-[#ff8c00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="h-2 w-full bg-gradient-to-r from-[#ff4500] to-[#ff8c00]" />
      
      <div className="p-8 md:p-10 relative">
        <div className="absolute top-6 right-8 text-6xl opacity-10 blur-sm pointer-events-none">💀</div>
        
        <div className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-200 space-y-6 whitespace-pre-wrap relative z-10">
          {roast.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? "font-bold text-white text-3xl mb-8" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10 pt-6 border-t border-zinc-800/50">
          <div className="text-zinc-500 font-mono text-sm">
            Target: @{username}
          </div>
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-orange-400 rounded-xl transition-all border border-zinc-800 hover:border-orange-500/50 group/btn w-full sm:w-auto justify-center"
          >
            <Copy size={18} className="group-hover/btn:scale-110 transition-transform" />
            <span className="font-medium">Copy Roast</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}