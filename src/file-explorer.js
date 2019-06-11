const fs            = require('fs');
const isDirectory   = require('./is-directory');
const path          = require('path');

const cwd = process.cwd();

/**
 * Explores a path extracting each file and its relative path
 * @param   {String}    root    Root folder
 * @param   {String}    source  Item to evaluate within root
 * @returns {Array}     Map of items
 * @throws  {Error}     If there's any problem
 */
const fileExplorer = (root = '', source = '') =>
{
    let list = [];

    let sourcePath = path.join(root, source);
    if (fs.existsSync(sourcePath))
    {
        if (isDirectory(sourcePath))
        {
            fs.readdirSync(sourcePath).forEach(
                item => list = list.concat(fileExplorer(sourcePath, item))
            );
        }
        else
        {
            sourcePath = sourcePath.replace(cwd, '');
            sourcePath = sourcePath.split(path.sep);
            sourcePath = sourcePath.splice((sourcePath.length - 2) * -1);
            sourcePath = sourcePath.join(path.sep);

            list.push({
                className   : source.replace(/\..+$/, ''),
                path        : `.${path.sep}${sourcePath}`
            })
        }
    }
    else
    {
        throw Error(`[@amjs/create-index] [ERROR] Source path "${sourcePath}" don't exists`);
    }

    return list;
};

module.exports = fileExplorer;
