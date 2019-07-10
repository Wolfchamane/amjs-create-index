const fs    = require('fs');
const path  = require('path');

const camelize = (text = '', capital = false) =>
{
    return text.split('-')
        .map((part, index) => (!!index || capital) ? `${part.charAt(0).toUpperCase()}${part.substr(1)}` : part)
        .join('-')
        .replace(/-/g, '');
};

const formatPrefix = prefix =>
{
    const scope = prefix.match(/@(\w+)/).pop();
    const afterScope = prefix.match(/\/(.+)$/).pop();

    return `${`${scope.charAt(0).toUpperCase()}${scope.substr(1)}`}${camelize(afterScope, true)}`;
};

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
    const prefix = formatPrefix(packageFile.name);

    return {
        date,
        author,
        version,
        prefix
    }
};
