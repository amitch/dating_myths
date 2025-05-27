export default {
  presets: [
    ['@babel/preset-env', { 
      targets: { 
        node: 'current',
        esmodules: true
      },
      modules: 'commonjs'
    }],
    ['@babel/preset-react', { 
      runtime: 'automatic',
      importSource: '@emotion/react'
    }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-modules-commonjs',
    '@emotion/babel-plugin'
  ],
};
