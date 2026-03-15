import OpenAI from 'openai';
import { GitHubStats } from './github';

export async function generateRoast(stats: GitHubStats): Promise<string> {
  const provider = process.env.AI_PROVIDER || 'openai';
  const model = process.env.AI_MODEL || 'gpt-4o';

  const systemPrompt = `You are a savage but funny comedian who roasts developers based on their GitHub stats. 
Be brutal, specific, and hilarious. Reference their actual stats, languages, commit messages, and repos.
Never be racist, sexist or hateful — keep it purely about their coding habits.
Format the roast as:
- One brutal opening line
- 3-5 specific roast points about their stats
- One surprisingly wholesome closing line

Make it sound like a comedy roast, not a formal review.

Examples to set the tone:
Stats: 847 repos, 2 stars total, main language JavaScript
Roast: "847 repos and 2 stars? You're basically running a graveyard for abandoned side projects. Your GitHub is less of a portfolio and more of a museum of broken promises. The fact that your most used language is JavaScript tells me you enjoy suffering voluntarily."

Stats: Last commit was 8 months ago, 0 contributions this year
Roast: "Your contribution graph looks like the Sahara Desert — vast, empty, and absolutely nothing growing. Your last commit was 8 months ago, which means your code has been in more therapy than you have."`;

  const userPrompt = `Roast this developer based on these stats:
Username: ${stats.username}
Bio: ${stats.bio || 'None'}
Followers: ${stats.followers} / Following: ${stats.following}
Public Repos: ${stats.public_repos}
Total Stars: ${stats.total_stars}
Top Languages: ${stats.top_languages.join(', ') || 'None'}
Most Starred Repo: ${stats.most_starred_repo || 'None'}
Account Age: ${stats.account_age_days} days
Recent Commits: ${stats.recent_commits.length > 0 ? stats.recent_commits.join(' | ') : 'No recent commits'}`;

  try {
    if (provider === 'anthropic') {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model,
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }]
        })
      });
      if (!response.ok) throw new Error('Anthropic API error');
      const data = await response.json();
      return data.content[0].text;
    }

    if (provider === 'ollama') {
      const host = process.env.OLLAMA_HOST || 'http://localhost:11434';
      const response = await fetch(`${host}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          stream: false,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ]
        })
      });
      if (!response.ok) throw new Error('Ollama API error');
      const data = await response.json();
      return data.message.content;
    }

    // Default: OpenAI or OpenRouter
    const isOpenRouter = provider === 'openrouter';
    const client = new OpenAI({
      apiKey: isOpenRouter ? process.env.OPENROUTER_API_KEY : process.env.OPENAI_API_KEY,
      baseURL: isOpenRouter ? 'https://openrouter.ai/api/v1' : undefined,
    });

    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
    });

    return response.choices[0].message?.content || 'Failed to generate roast.';
  } catch (error: any) {
    console.error('AI Error:', error);
    throw new Error('Failed to generate roast');
  }
}