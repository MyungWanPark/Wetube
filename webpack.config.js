const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

console.log(path.resolve(__dirname, "client"));

const BASE_PATH = "./src/client/js/";
module.exports = {
  entry: {
    main: BASE_PATH + "main.js",
    videoPlayer: BASE_PATH + "videoPlayer.js",
    videoRecorder: BASE_PATH + "videoRecorder.js",
    commentSection: BASE_PATH + "commentSection.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
