const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add path aliases to Metro resolver
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@features': path.resolve(__dirname, 'src/features'),
  '@store': path.resolve(__dirname, 'src/store'),
  '@types': path.resolve(__dirname, 'src/types'),
  '@navigation': path.resolve(__dirname, 'src/navigation'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '@config': path.resolve(__dirname, 'src/config'),
  '@theme': path.resolve(__dirname, 'src/theme'),
  '@assets': path.resolve(__dirname, 'assets'),
};

module.exports = config;
