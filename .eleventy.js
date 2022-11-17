const util = require('util');
const markdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img");
const path = require("path");

const md = new markdownIt({
    html: true
});

module.exports = function (eleventyConfig) {
    
    eleventyConfig.addPassthroughCopy('./src/sitemap.xml');
    eleventyConfig.addPassthroughCopy('./src/robots.txt');
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
    eleventyConfig.addNunjucksShortcode("img", function(img) {
        try {
            const src = "./src/assets/" + img.src;
            var imageOptimization = async function () {
                await Image(src, {
                    filenameFormat: function (hash, src, width, format, options) {
                        return `${img.src}-${width}.${format}`;
                    },
                    outputDir: './public/assets',
                    widths: img.widths,
                    formats: ["webp"]
                });
            }
            imageOptimization();
        } catch (e) {
            console.log('e', e);
        }
        return "";
      });
    return {
        htmlTemplateEngine: "njk",
        dir : {
            includes: "_includes",
            layouts: "_layouts",
            input: "src",
            output: "public"
        }
    };
}