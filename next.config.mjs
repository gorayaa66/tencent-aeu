/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./node_modules"],
  },
  // 禁用 SWC 压缩，使用 Terser
  swcMinify: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 禁用代码压缩中的变量名混淆
      config.optimization.minimize = true;
      config.optimization.minimizer = config.optimization.minimizer?.map(
        (minimizer) => {
          if (minimizer.constructor.name === "TerserPlugin") {
            minimizer.options.terserOptions = {
              ...minimizer.options?.terserOptions,
              mangle: false, // 禁用变量名混淆
              compress: {
                ...minimizer.options?.terserOptions?.compress,
                inline: false,
                reduce_vars: false,
              },
            };
          }
          return minimizer;
        }
      );

      // 将腾讯云 SDK 打包到单独的 chunk
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          tencentcloud: {
            test: /[\\/]node_modules[\\/](@tencentcloud|tuikit-atomicx-react|tim-js-sdk|trtc-cloud-js-sdk)[\\/]/,
            name: "tencentcloud-sdk",
            chunks: "all",
            priority: 30,
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
