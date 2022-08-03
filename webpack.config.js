require('dotenv').config();
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

// This is a bundling webpack, and will combine all of your tools into a single file
module.exports = {
    entry: ["./react/reacthookform/src/app.tsx"],
    mode: isProd ? "production" : "development",
    output: {
        filename: "bundle.min.js",
        path: path.resolve(__dirname, "dist")
    },
    // Enable sourcemaps for debugging webpack's output. 
    devtool: isProd ? "(none)" : "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions. 
        extensions: [".ts", ".tsx", ".js"]
    },
     module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'. 
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    optimization: {
        minimize: isProd, // Toggle me to minimize or not
        minimizer: [
            new TerserPlugin(),
          ],
    }
} 