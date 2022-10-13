const path = require("path");
require("babel-core/register");

module.exports = {
    mode: "development",
    //entry point
    //TODO Variable Entry Points
    entry: {
        app: path.resolve(__dirname, "src/js/app.js"),
        contact: path.resolve(__dirname, "src/js/contact.js"),
        contactsend: path.resolve(__dirname, "src/js/contactsend.js")
    },
    output: {
        //building browser compatible js file
        path: path.resolve(__dirname, "public/js"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                // A regex that looks at all Javascript files
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    //this is where we define our presets
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};
