const { build } = require('vite');
const { execSync } = require('child_process');

async function main() {
  try {
    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Build the application
    console.log('Building application...');
    await build({
      configFile: 'vite.config.js',
      mode: 'production'
    });

    console.log('Build completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

main();
