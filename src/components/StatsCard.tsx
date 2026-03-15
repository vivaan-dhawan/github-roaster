import { GitHubStats } from '@/lib/github';
import { motion } from 'framer-motion';
import { FolderGit2, Star, Users, UserPlus, Code2, CalendarDays } from 'lucide-react';

export default function StatsCard({ stats }: { stats: GitHubStats }) {
  // Calculate a totally arbitrary and fake "Roast Score" based on stats
  const roastScore = Math.min(
    100,
    Math.max(
      10,
      100 - (stats.total_stars * 2) - (stats.followers * 0.5) + (stats.public_repos * 1.5)
    )
  );

  return (
    <div className="w-full space-y-6">
      {/* The Roast Score Meter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 rounded-2xl"
      >
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1">Roastability Score</div>
            <div className="text-3xl font-black">{Math.round(roastScore)}<span className="text-zinc-500 text-xl">/100</span></div>
          </div>
          <div className="text-right">
            <div className="text-orange-500 font-bold">
              {roastScore > 80 ? 'Extremely Roastable 💀' : roastScore > 50 ? 'Needs Therapy 😭' : 'Barely Acceptable 🤓'}
            </div>
          </div>
        </div>
        <div className="h-4 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${roastScore}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
          />
        </div>
      </motion.div>

      {/* The Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatBox 
          icon={<FolderGit2 />} 
          label="Public Repos" 
          value={stats.public_repos} 
          delay={0.3} 
        />
        <StatBox 
          icon={<Star className="text-yellow-500" />} 
          label="Total Stars" 
          value={stats.total_stars} 
          delay={0.4} 
        />
        <StatBox 
          icon={<Code2 className="text-blue-400" />} 
          label="Top Language" 
          value={stats.top_languages.length ? stats.top_languages[0] : 'None'} 
          delay={0.5} 
        />
        <StatBox 
          icon={<Users />} 
          label="Followers" 
          value={stats.followers} 
          delay={0.6} 
        />
        <StatBox 
          icon={<UserPlus />} 
          label="Following" 
          value={stats.following} 
          delay={0.7} 
        />
        <StatBox 
          icon={<CalendarDays />} 
          label="Account Age" 
          value={`${Math.round(stats.account_age_days / 365.25)} yrs`} 
          delay={0.8} 
        />
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, delay }: { icon: React.ReactNode, label: string, value: string | number, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors"
    >
      <div className="text-zinc-500 mb-3 group-hover:text-orange-400 transition-colors group-hover:scale-110 transform duration-300">
        {icon}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}