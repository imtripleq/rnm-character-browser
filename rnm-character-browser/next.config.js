module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        port: "",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "robohash.org",
        port: "",
        pathname: "/*",
      },
    ],
  },
};
