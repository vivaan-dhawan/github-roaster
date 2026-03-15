import { GitHubStats } from '@/lib/github';
import { motion } from 'framer-motion';

export default function StatsCard({ stats }: { stats: GitHubStats }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="max-w-2xl w-full mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      <StatBox label="Repos" value={stats.public_repos} />
      <StatBox label="Stars" value={stats.total_stars} />
      <StatBox label="Followers" value={stats.followers} />
      <StatBox label="Languages" value={stats.top_languages.length ? stats.top_languages[0] : 'None'} />
    </motion.div>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center">
      <div className="text-zinc-400 text-xs uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xl font-bold text-white">{value}</div>
    </div>
  );
}