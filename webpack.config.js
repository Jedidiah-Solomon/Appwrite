const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/scripts/index.js", // Entry point for index.js
    signup: "./src/scripts/signup.js", // Entry point for signup.js
    login: "./src/scripts/login.js", // Entry point for login.js
    verify: "./src/scripts/verify.js", // Entry point for verify.js
    newsToday: "./src/scripts/news-today.js", // Entry point for news-today.js
  },
  output: {
    filename: "[name].bundle.js", // Output bundle filename based on entry name
    path: path.resolve(__dirname, "dist"), // Output directory path
    publicPath: "/dist/", // Public URL path for assets
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Handle CSS files
        use: ["style-loader", "css-loader"], // Use style-loader and css-loader
      },
      {
        test: /\.m?js$/, // Handle JavaScript files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: "babel-loader", // Use babel-loader for JavaScript transpilation
          options: {
            presets: ["@babel/preset-env"], // Use @babel/preset-env for environment setup
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src"), // Serve static files from 'src' directory
    },
    port: 5500, // Dev server port
    host: "localhost", // Dev server host
    open: true, // Open browser automatically
    historyApiFallback: true, // Enable HTML5 History API fallback
    headers: {
      "Access-Control-Allow-Origin": "*", // Adjust as needed for CORS policies
    },
  },
};
