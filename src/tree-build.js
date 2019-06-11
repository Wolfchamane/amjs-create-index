/**
 * Builds a reference within an object and returns that reference.
 * @param   {Object}    ref     Original reference
 * @param   {String}    node    Node to create
 * @returns {Object}    New reference
 * @private
 */
const _builder = (ref = {}, node = '') =>
{
    if (!ref[node])
    {
        ref[node] = {}
    }

    return ref[node];
};

/**
 * Creates a tree from a list of files
 * @param   {Array}     list    List of files
 * @returns {Object}    Tree object
 */
module.exports = (list = []) =>
{
    const tree = {};
    list.forEach(
        item =>
        {
            const path = item.path
                .replace(/^\.\//, '')
                .split('/');

            if (Array.isArray(path) && path.length)
            {
                let ref = tree;
                let part = path.shift();
                while(path.length)
                {
                    ref = _builder(ref, part);
                    part = path.shift();
                }

                ref[item.className] = item.className;
            }
            else
            {
                tree[item.className] = item.className;
            }
        }
    );

    return tree;
};