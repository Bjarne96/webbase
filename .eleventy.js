const util = require('util');
const markdownIt = require("markdown-it");
const md = new markdownIt({
    html: true
});

module.exports = function (eleventyConfig) {
    
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/svgs');
    // eleventyConfig.ignores.add("./src/components/");
    eleventyConfig.addFilter('dump', (obj) => {
        return util.inspect(obj)
    });
    eleventyConfig.addPairedShortcode("svg", content => {
        return(content);
    });

    eleventyConfig.addPairedShortcode("markdown", content => {
    const myRegexp = /(-{3}[\w\W]+-{3}[\s])([\w\W]+)/g;
    const match = myRegexp.exec(content);
    return md.render(match[2]);
    });

    return {
        dir : {
            input: "src",
            output: "public"
        }
    };
}