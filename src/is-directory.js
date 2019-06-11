const fs = require('fs');

/**
 * Returns if a path refers to a directory or not
 * @param   {String}    path    To evaluate
 * @returns {Boolean}   `true` if is a directory, `false` in any other case
 */
module.exports = (path = '') => fs.statSync(path).isDirectory();