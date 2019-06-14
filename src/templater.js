const fs            = require('fs');
const Handlebars    = require('handlebars');
const path          = require('path');
const templater     = require('@amjs/templater');

/**
 * Returns a formatted JSON plain object as String
 * @param   {Object}    item    Item to format
 * @returns {String}    Plain and formatted object
 */
const toJSON = (item = {}) =>
{
    return JSON.stringify(item, null, 4).replace(/["']+/g, '');
};

/**
 * Fullfils "index.js" template
 * @param indexPath
 * @param context
 */
module.exports = (indexPath = '', context = {}) =>
{
    // Register toJSON helper within Handlebars
    Handlebars.registerHelper('toJSON', toJSON);

    // Write output
    fs.writeFileSync(
        indexPath,
        templater(path.resolve(__dirname, 'template.hbs'), context),
        'utf-8'
    );
};
