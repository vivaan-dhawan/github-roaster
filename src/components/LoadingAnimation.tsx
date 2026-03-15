import { motion } from 'framer-motion';

const messages = [
  "Analyzing your terrible code...",
  "Counting your unfinished projects...",
  "Reading your 3am commit messages...",
  "Judging your naming conventions...",
  "Questioning your life choices..."
];

export default function LoadingAnimation({ step }: { step: number }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 mt-8 space-y-4">
      <div className="text-6xl animate-spin">🔥</div>
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-lg font-mono text-zinc-400"
      >
        {messages[step % messages.length]}
      </motion.div>
    </div>
  );
}
