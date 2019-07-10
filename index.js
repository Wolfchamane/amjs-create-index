const config        = require('./src/config');
const fileExplorer  = require('./src/file-explorer');
const getInfo       = require('./src/get-info');
const templater     = require('./src/templater');
const treeBuild     = require('./src/tree-build');

try
{
    const { source, indexPath } = config();
    const info = getInfo();
    const list = fileExplorer(source, '', info);
    const tree = treeBuild(list);

    templater(indexPath, Object.assign({}, { list, tree }, info));
    process.exit(0);
}
catch(e)
{
    console.log(e.message);
    process.exit(-1);
}
