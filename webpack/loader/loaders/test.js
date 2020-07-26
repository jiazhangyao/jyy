const loaderUtils = require('loader-utils')

module.exports = function(source) {
    const options = loaderUtils.getOptions(this)
    console.log('options', options);
    
    return source.replace('Webpack', this.query.name)
}