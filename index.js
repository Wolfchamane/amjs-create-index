const config        = require('./src/config');
const fileExplorer  = require('./src/file-explorer');
const getInfo       = require('./src/get-info');
const templater     = require('./src/templater');
const treeBuild     = require('./src/tree-build');

try
{
    const { source, indexPath } = config();
    const list = fileExplorer(source);
    const tree = treeBuild(list);

    templater(indexPath, Object.assign({}, { list, tree}, getInfo()));
    process.exit(0);
}
catch(e)
{
    console.log(e.message);
    process.exit(-1);
}