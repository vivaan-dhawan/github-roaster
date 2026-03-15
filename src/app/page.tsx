'use client';

import { useState, useEffect } from 'react';
import RoastCard from '@/components/RoastCard';
import StatsCard from '@/components/StatsCard';
import LoadingAnimation from '@/components/LoadingAnimation';
import { GitHubStats } from '@/lib/github';
import { Search } from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<{ stats: GitHubStats; roast: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((s) => s + 1);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    setError('');
    setResult(null);
    setLoadingStep(0);

    try {
      const res = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to roast');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-6 pt-10">
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff4500] to-[#ff8c00] rounded-lg blur opacity-25 animate-pulse"></div>
          <h1 className="relative text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,69,0,0.5)]">
            GitHub Roaster <span className="inline-block animate-flicker">🔥</span>
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-zinc-400 font-medium">
          Enter a username and watch AI destroy their coding ego.
        </p>
      </div>

      {!result && !isLoading && (
        <form onSubmit={handleRoast} className="glass-panel p-6 md:p-8 rounded-3xl max-w-2xl mx-auto transform transition-all hover:scale-[1.01]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-6 h-6" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username..."
                className="w-full bg-black/50 border border-zinc-800 text-white rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-zinc-600"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#ff4500] to-[#ff8c00] hover:from-[#ff5500] hover:to-[#ffa500] text-white font-bold py-4 px-8 rounded-2xl shadow-[0_0_20px_rgba(255,69,0,0.3)] hover:shadow-[0_0_30px_rgba(255,69,0,0.5)] transition-all flex items-center justify-center gap-2 whitespace-nowrap text-lg w-full md:w-auto"
            >
              🔥 Roast Me
            </button>
          </div>
        </form>
      )}

      {isLoading && <LoadingAnimation step={loadingStep} />}

      {error && (
        <div className="glass-panel border-red-500/30 p-6 rounded-2xl text-center max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <h3 className="text-xl font-bold text-red-400 mb-1">Mission Failed</h3>
          <p className="text-zinc-400">{error}</p>
          <button 
            onClick={() => setError('')} 
            className="mt-4 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {result && !isLoading && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <RoastCard roast={result.roast} username={result.stats.username} />
          
          <div className="pt-8 border-t border-zinc-800/50">
            <h3 className="text-2xl font-bold text-center mb-8 text-zinc-300">The Tragic Stats Behind The Roast</h3>
            <StatsCard stats={result.stats} />
          </div>
          
          <div className="flex justify-center pt-8">
            <button
              onClick={() => {
                setResult(null);
                setUsername('');
              }}
              className="glass-panel px-8 py-4 rounded-xl hover:bg-white/5 transition-all text-lg font-medium flex items-center gap-2"
            >
              <span>♻️</span> Roast Another Dev
            </button>
          </div>
        </div>
      )}
    </div>
  );
}