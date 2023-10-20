const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
      // 他のディレクトリもここに追加
    },
  },
};
