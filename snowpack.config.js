module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: ['@snowpack/plugin-typescript'],
  buildOptions: {
    baseUrl: '/svg-basketball-court-editor',
    metaUrlPath: 'meta',
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
};
