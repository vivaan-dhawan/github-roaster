<div align="center">
  <h1>🔥 GitHub Roaster</h1>
  <p><strong>A hilarious AI-powered web app that completely destroys your GitHub coding ego.</strong></p>
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FVIVAAN-DHAWAN%2Fgithub-roaster"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
</div>

## 🤔 What is this?
Have you ever looked at your GitHub profile and thought, "Wow, I am a 10x developer"? Well, you're wrong. And this app is here to prove it. 

Enter any GitHub username, and our highly trained AI will fetch their repos, commit history, and languages to generate a savage, personalized roast. It's basically a code review, but evil.

**Warning: May cause existential crisis, impostor syndrome, or a sudden urge to delete your `node_modules`.**
**Try Here: https://github-roaster-2n9pwmvqg-vivaan-dhawans-projects.vercel.app/ **

*(Insert Screenshots Here)*

## 🚀 How to run it locally

1. **Clone it (if you dare):**
```bash
git clone https://github.com/VIVAAN-DHAWAN/github-roaster
cd github-roaster
```

2. **Install dependencies (hope you have enough RAM):**
```bash
npm install
```

3. **Set up the env variables:**
```bash
cp .env.example .env.local
```
Fill in your `OPENAI_API_KEY` (or whichever AI provider you want to use).

4. **Run it:**
```bash
npm run dev
```

## 🤖 Supported AI Providers
We support multiple providers so you can get roasted on a budget:
- **OpenAI** (default, `gpt-4o`)
- **Anthropic** (`claude-sonnet-4-6`)
- **OpenRouter** (`stepfun/step-3.5-flash:free`)
- **Ollama** (fully local, free, `llama3.2`)

Set `AI_PROVIDER` and `AI_MODEL` in your `.env.local`.
