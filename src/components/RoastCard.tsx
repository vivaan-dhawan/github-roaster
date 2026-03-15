import { Copy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoastCard({ roast }: { roast: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roast);
    alert('Copied to clipboard!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-2xl w-full mx-auto p-8 rounded-2xl bg-gradient-to-br from-red-950 to-black border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] mt-8"
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl animate-bounce">🔥</div>
      
      <div className="text-xl md:text-2xl font-serif leading-relaxed text-red-50 space-y-4 whitespace-pre-wrap">
        {roast}
      </div>

      <button 
        onClick={copyToClipboard}
        className="absolute bottom-4 right-4 p-2 text-red-400 hover:text-red-200 transition-colors bg-red-950/50 rounded-full hover:bg-red-900/50"
        title="Copy to clipboard"
      >
        <Copy size={20} />
      </button>
    </motion.div>
  );
}