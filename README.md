# 🚀 CheckMyCode - AI-Powered Code Review Platform

<div align="center">

![CheckMyCode Logo](https://img.shields.io/badge/🔍-CheckMyCode-667eea?style=for-the-badge&labelColor=764ba2)

**Transform your code quality with AI-powered analysis from multiple LLMs**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

[🎯 Live Demo](https://check-my-code.vercel.app) • [📚 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🤝 Contributing](#-contributing)

</div>

---

## 📖 Overview

CheckMyCode is a sophisticated code analysis platform that leverages multiple AI language models to provide comprehensive feedback on your code. Get instant insights into code quality, security vulnerabilities, performance bottlenecks, and style improvements - all in one beautiful, intuitive interface.

### 🎯 Perfect For
- **Developers** seeking instant code feedback
- **Code Reviewers** wanting AI-assisted analysis
- **Students** learning best practices
- **Teams** standardizing code quality
- **Open Source Projects** maintaining high standards

## ✨ Features

### 🧠 **AI-Powered Analysis**
- **Multi-LLM Consensus** - Aggregate feedback from multiple AI models
- **Real-time Evaluation** - Instant analysis as you paste your code
- **Context-Aware Feedback** - Language-specific insights and recommendations

### 🔍 **Comprehensive Code Review**
- **Security Analysis** - Detect SQL injection, XSS, and other vulnerabilities
- **Performance Optimization** - Identify bottlenecks and efficiency improvements
- **Code Style** - Enforce best practices and consistent formatting
- **Error Handling** - Catch missing validations and exception handling

### 📊 **Beautiful Visualizations**
- **Interactive Charts** - Radar charts, bar graphs, and score breakdowns
- **Grade System** - A-F letter grades with color-coded feedback
- **Issue Categorization** - Organized by severity (High/Medium/Low)
- **Progress Tracking** - Visual consensus and agreement metrics

### 🛠 **Developer Experience**
- **Before/After Code** - Side-by-side comparisons with syntax highlighting
- **Actionable Suggestions** - Specific fixes with code examples
- **Language Detection** - Support for JavaScript, Python, Java, and more
- **Mobile Responsive** - Works perfectly on all devices

### 🚀 **Production Ready**
- **Error Boundaries** - Graceful error handling and recovery
- **Environment Config** - Easy deployment with environment variables
- **SEO Optimized** - Meta tags and social sharing ready
- **Performance Optimized** - Code splitting and lazy loading

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser
- Git for version control

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/maverickalo/check-my-code.git
cd check-my-code

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start development server
npm start
```

The app will open at `http://localhost:3000` 🎉

### 🔧 Environment Configuration

Create a `.env` file in the root directory:

```env
# Required: Your code evaluation API endpoint
REACT_APP_API_URL=https://your-api-endpoint.com/webhook/eval

# Optional: Analytics tracking
REACT_APP_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

### 🎯 Usage

1. **Paste Your Code** - Select language and paste your code snippet
2. **Click Evaluate** - Submit for AI analysis
3. **Review Results** - Get detailed feedback with visualizations
4. **Apply Fixes** - Use suggested improvements to enhance your code

## 🚀 Deployment

### One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/maverickalo/check-my-code)

**Recommended for production** - Automatic HTTPS, global CDN, and seamless GitHub integration.

### Manual Deploy to Vercel

1. Click the button above or run:
```bash
npm i -g vercel
vercel
```

2. Set environment variable in Vercel dashboard:
   - `REACT_APP_API_URL`: Your API endpoint

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/CheckMyCode)

1. Click the button above or:
```bash
# Build the project
npm run build

# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

2. Set environment variable in Netlify dashboard:
   - `REACT_APP_API_URL`: Your API endpoint

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npx serve -s build
```

## 📊 Performance Optimization

The app includes:
- Code splitting for optimal bundle size
- Lazy loading of components
- Optimized images and assets
- Error boundaries for graceful error handling
- Environment-based configuration

## 🛡️ Security

- No sensitive data stored client-side
- API endpoint configurable via environment variables
- Input sanitization before API calls
- HTTPS enforced in production

## 📝 API Integration

The app expects an API endpoint that accepts:

**Request:**
```json
{
  "code": "your code snippet here"
}
```

**Response:**
```json
{
  "finalScore": 80,
  "finalRecommendation": "needs_improvement",
  "averages": { ... },
  "suggestions": [ ... ],
  "issues": [ ... ],
  "evals": [ ... ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions, please open an issue on GitHub.

## 📚 Documentation

### 🔌 API Integration

The app expects an API endpoint that accepts POST requests:

**Request Format:**
```json
{
  "code": "your JavaScript/Python/etc code here"
}
```

**Response Format:**
```json
{
  "finalScore": 85,
  "finalRecommendation": "needs_improvement",
  "averages": {
    "styleScore": 82.2,
    "performanceScore": 81.1,
    "securityScore": 77.8,
    "overallScore": 85.0
  },
  "consensus": {
    "agreed": true,
    "summary": "Most reviewers agree this code needs minor improvements."
  },
  "suggestions": [
    "Use consistent variable naming conventions",
    "Add input validation for security",
    "Optimize database queries"
  ],
  "issues": [
    {
      "severity": "high",
      "category": "security",
      "message": "SQL injection vulnerability detected",
      "line": 23,
      "column": 15,
      "codeSnippet": "SELECT * FROM users WHERE id = " + userId,
      "fixedSnippet": "SELECT * FROM users WHERE id = ?",
      "suggestedFix": "Use parameterized queries"
    }
  ],
  "evals": [
    {
      "reviewer": "gpt-4",
      "score": 8,
      "comments": "Well-structured code with minor security concerns"
    }
  ]
}
```

### 🎨 Customization

#### Themes
The app uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --error-color: #dc3545;
}
```

#### API Endpoints
Configure different endpoints for different environments:

```env
# Development
REACT_APP_API_URL=http://localhost:3001/api/evaluate

# Production
REACT_APP_API_URL=https://api.checkmycode.com/evaluate
```

## 🛡️ Security & Performance

### Security Features
- ✅ **No client-side secrets** - All sensitive data in environment variables
- ✅ **Input sanitization** - Code is sanitized before API calls
- ✅ **HTTPS enforcement** - All production deployments use SSL
- ✅ **Error boundaries** - Prevents sensitive error information leakage

### Performance Optimizations
- ⚡ **Code splitting** - Components loaded on demand
- ⚡ **Asset optimization** - Images and fonts optimized for web
- ⚡ **CDN delivery** - Global content delivery network
- ⚡ **Caching strategies** - Intelligent browser and CDN caching

## 🧪 Development

### Available Scripts

```bash
# Development server
npm start

# Production build
npm run build

# Run tests
npm test

# Deploy to GitHub Pages
npm run deploy

# Lint code
npm run lint
```

### Project Structure

```
src/
├── components/          # React components
│   ├── CodeInput.js     # Code input with syntax highlighting
│   ├── ResultsDisplay.js # Main results container
│   ├── ScoreVisualization.js # Charts and graphs
│   ├── IssuesDisplay.js # Code issues with fixes
│   ├── ConsensusSummary.js # AI consensus overview
│   └── ErrorBoundary.js # Error handling
├── App.js              # Main application
├── index.js            # Entry point
└── index.css           # Global styles
```

### Contributing Guidelines

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📊 Metrics & Analytics

Track usage and performance:
- User engagement metrics
- API response times
- Error rates and debugging
- Popular programming languages
- Most common code issues

## 🔗 Links & Resources

- 🌐 **[Live Demo](https://check-my-code.vercel.app)** - Try the app now!
- 📖 **[API Documentation](https://docs.checkmycode.com)** - Integration guide
- 🐛 **[Report Issues](https://github.com/maverickalo/check-my-code/issues)** - Bug reports and feature requests
- 💬 **[Discussions](https://github.com/maverickalo/check-my-code/discussions)** - Community support
- 🚀 **[Roadmap](https://github.com/maverickalo/check-my-code/projects)** - Upcoming features

---

<div align="center">

**Built with ❤️ by developers, for developers**

*Powered by React • Enhanced with AI • Deployed on Vercel*

[⭐ Star on GitHub](https://github.com/maverickalo/check-my-code) • [🐦 Follow Updates](https://twitter.com/checkmycode)

</div>