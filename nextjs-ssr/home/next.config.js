const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    home: `home@http://localhost:3001/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    shop: `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js?${Date.now()}`,
    checkout: `checkout@http://localhost:3000/_next/static/${location}/remoteEntry.js?${Date.now()}`,
  };
};
module.exports = withFederatedSidecar({
  name: 'home',
  filename: 'static/chunks/remoteEntry.js',
  exposes: {
    './nav': './components/nav.js',
    './home': './pages/index.js',
    './pages-map': './pages-map.js',
  },
  remotes,
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  webpack5: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /_app.js/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    return config;
  },
});
