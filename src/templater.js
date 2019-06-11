const fs            = require('fs');
const Handlebars    = require('handlebars');
const path          = require('path');

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

    // Build template
    let template = fs.readFileSync(path.resolve(__dirname, 'template.hbs')).toString();
    template = Handlebars.compile(template);

    // Write output
    fs.writeFileSync(
        indexPath,
        template(context),
        'utf-8'
    );
};
