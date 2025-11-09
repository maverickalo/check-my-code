# CheckMyCode - AI-Powered Code Review

A modern React application that evaluates code snippets using multiple LLMs to provide comprehensive feedback on code quality, security, and performance.

![CheckMyCode](https://img.shields.io/badge/React-18.2.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

- **Multi-LLM Analysis**: Get feedback from multiple AI models for comprehensive code review
- **Real-time Evaluation**: Instant code analysis with detailed feedback
- **Issue Detection**: Identifies security vulnerabilities, performance issues, and style problems
- **Visual Analytics**: Beautiful charts and visualizations of code quality metrics
- **Code Snippets**: Side-by-side comparison of problematic code and suggested fixes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/CheckMyCode.git
cd CheckMyCode

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm start
```

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://your-api-endpoint.com/webhook/eval
```

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/CheckMyCode)

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

## 🔗 Links

- [Live Demo](https://your-app-url.vercel.app)
- [API Documentation](https://your-api-docs.com)
- [Report Issues](https://github.com/yourusername/CheckMyCode/issues)

---

Built with ❤️ using React and powered by AI