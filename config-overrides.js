/*
    多入口配置
    multipleEntry config
    {
        entry: './src/index2.tsx',
        template: 'public/index2.html',
        outPath: '/index2.html'
    }
*/
const entryConfig = [
    // add entry config
];
const multipleEntry = require('react-app-rewire-multiple-entry')(entryConfig);

module.exports = function override(config) {
    if (config.mode === 'production') config.devtool = 'none';
    if (entryConfig.length > 0)
        multipleEntry.addMultiEntry(config);
    config.output.publicPath = './';
    return config;
};
