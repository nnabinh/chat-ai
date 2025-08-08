module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@features': './src/features',
            '@store': './src/store',
            '@types': './src/types',
            '@navigation': './src/navigation',
            '@utils': './src/utils',
            '@config': './src/config',
            '@theme': './src/theme',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};
