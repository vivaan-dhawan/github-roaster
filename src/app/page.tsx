'use client';

import { useState, useEffect } from 'react';
import RoastCard from '@/components/RoastCard';
import StatsCard from '@/components/StatsCard';
import LoadingAnimation from '@/components/LoadingAnimation';
import { GitHubStats } from '@/lib/github';

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
      }, 2000);
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
    <main className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center justify-center font-sans">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text pb-2">
          GitHub Roaster
        </h1>
        <p className="text-xl text-zinc-400">
          Enter a username and let AI completely destroy their coding ego.
        </p>

        {!result && !isLoading && (
          <form onSubmit={handleRoast} className="flex flex-col md:flex-row gap-4 justify-center items-center mt-12">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full md:w-96 text-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-lg transition-colors w-full md:w-auto flex items-center justify-center gap-2"
            >
              🔥 Roast Me
            </button>
          </form>
        )}

        {isLoading && <LoadingAnimation step={loadingStep} />}

        {error && (
          <div className="p-4 bg-red-950/50 border border-red-500/50 text-red-400 rounded-xl mt-8">
            {error}
          </div>
        )}

        {result && !isLoading && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <RoastCard roast={result.roast} />
            <StatsCard stats={result.stats} />
            
            <button
              onClick={() => {
                setResult(null);
                setUsername('');
              }}
              className="mt-8 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
            >
              Roast Another Dev
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
