module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import '@/styles/theme.scss';
        `,
      },
    },
  },

  chainWebpack(config) {
    const regex = /\.(vue|js|ts|svg)$/;

    config.module.rule('svg').issuer((file) => !regex.test(file));

    // Use our loader to handle svg imported by other files
    config.module
      .rule('svg-component')
      .test(/\.svg$/)
      .issuer((file) => regex.test(file))
      .use('vue')
      .loader('vue-loader')
      .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader');
  },
};
