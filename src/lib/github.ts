export interface GitHubStats {
  username: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  account_age_days: number;
  total_stars: number;
  total_forks: number;
  top_languages: string[];
  most_starred_repo: string | null;
  recent_commits: string[];
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  // Fetch User Profile
  const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
  if (!userRes.ok) {
    if (userRes.status === 404) throw new Error('User not found');
    throw new Error('Failed to fetch user data');
  }
  const user = await userRes.json();

  // Fetch Repos
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { headers });
  const repos = reposRes.ok ? await reposRes.json() : [];

  let total_stars = 0;
  let total_forks = 0;
  const languageMap: Record<string, number> = {};
  let most_starred_repo = null;
  let max_stars = -1;

  for (const repo of repos) {
    total_stars += repo.stargazers_count;
    total_forks += repo.forks_count;
    
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }

    if (repo.stargazers_count > max_stars) {
      max_stars = repo.stargazers_count;
      most_starred_repo = repo.name;
    }
  }

  const top_languages = Object.entries(languageMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([lang]) => lang);

  // Fetch recent events for commits
  const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, { headers });
  const events = eventsRes.ok ? await eventsRes.json() : [];
  
  const recent_commits: string[] = [];
  for (const event of events) {
    if (event.type === 'PushEvent' && event.payload.commits) {
      for (const commit of event.payload.commits) {
        recent_commits.push(commit.message);
      }
    }
  }

  const created_at = new Date(user.created_at);
  const now = new Date();
  const account_age_days = Math.floor((now.getTime() - created_at.getTime()) / (1000 * 3600 * 24));

  return {
    username: user.login,
    name: user.name,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    public_repos: user.public_repos,
    account_age_days,
    total_stars,
    total_forks,
    top_languages,
    most_starred_repo,
    recent_commits: recent_commits.slice(0, 5), // Keep it brief for AI
  };
}