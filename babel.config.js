// Para quitar los console log
const plugins = [];
// remove console outputs in production enviroment!
if (process.env.VUE_APP_STAGE === 'production') {
  plugins.push('transform-remove-console');
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins,
};
