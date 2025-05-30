# Dating Myths Quiz

A modern, interactive quiz application built with React, Vite, and Framer Motion. Test your knowledge about dating myths and learn interesting facts along the way!

## Features

- ✨ Interactive quiz interface with smooth animations
- 📱 Responsive design that works on all devices
- 🎨 Beautiful UI with a modern, clean aesthetic
- 🚀 Built with the latest web technologies
- 📊 Track your progress through different quiz areas

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Vercel CLI (optional, for manual deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dating_myths.git
   cd dating_myths
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🚀 Deployment

### Deploy to Vercel

This project is configured for easy deployment on Vercel. Follow these steps:

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Go to [Vercel](https://vercel.com) and sign in with your Git provider
3. Click "New Project" then "Import" your repository
4. Vercel will automatically detect the Vite project and configure the settings
5. Click "Deploy" and wait for the deployment to complete

Your app will be live at `https://your-project-name.vercel.app`

#### Manual Deployment with Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to your Vercel account:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

### Environment Variables

This project doesn't require any environment variables for basic functionality. However, if you add any API keys or sensitive data in the future, create a `.env` file in the root directory:

```env
VITE_API_KEY=your_api_key_here
```

And update the Vercel project settings with these environment variables.

## 📦 Build Output

The production build will be created in the `dist/` directory, containing:

- `index.html` - The main HTML file
- `assets/` - Compiled JavaScript and CSS files
- `public/` - Static assets (images, fonts, etc.)

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Lint the codebase
- `npm run format` - Format the code using Prettier

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
│   ├── QuizPage.jsx
│   └── ResultsPage.jsx
├── utils/          # Utility functions and constants
│   └── animations.js
├── App.jsx         # Main application component
└── main.jsx        # Application entry point
```

## 🛠 Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library for React
- [Emotion](https://emotion.sh/) - CSS-in-JS library
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [Testing Library](https://testing-library.com/) - Testing utilities for React

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the GNU AGPL License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by modern web development practices
- Built with ❤️ using amazing AI (Grok and Windsurf) and open source tools
