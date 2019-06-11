const fs    = require('fs');
const path  = require('path');

/**
 * Extracts package info from calling module
 * @returns {Object}    Data obtained from package.json file and other info
 */
module.exports = () =>
{
    const cwd = process.cwd();
    let packageFile = path.join(cwd, 'package.json');
    if (!fs.existsSync(packageFile))
    {
        packageFile = path.join(__dirname, '..', 'package.json');
    }

    packageFile = require(packageFile);

    const date = (new Date()).toISOString();
    const author = packageFile.author;
    const version = packageFile.version;

    return {
        date,
        author,
        version
    }
};