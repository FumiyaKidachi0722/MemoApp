/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
      config: path.resolve(__dirname, 'src/config'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      types: path.resolve(__dirname, 'src/types'),
      // 他のディレクトリもここに追加
    },
  },
};
