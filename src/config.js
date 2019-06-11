const fs    = require('fs');
const path  = require('path');

/**
 * Evaluates module configuration, in case of error throws an {Error}
 * @throws  {Error}     If module is badly configured or called
 * @returns {Object}    Source folder path to explore and "index.js" output path
 */
module.exports = () =>
{
    const args  = process.argv;
    const cwd   = process.cwd();
    let source;
    let indexPath;

    if (args.length === 3)
    {
        source = process.argv.splice(-2).pop();
        indexPath = path.join(cwd, source, 'index.js');

        // Remove previous "index.js" generated files
        if (fs.existsSync(indexPath))
        {
            fs.unlinkSync(indexPath);
        }

        source = path.resolve(cwd, source);
    }
    else
    {
        throw Error('[@amjs/create-index] [Error] Invalid number of arguments: "$ node @amjs/create-index <folder>"');
    }

    return {
        source,
        indexPath
    }

};
