const Twig = require('twig');
const fs = require('fs');
const path = require('path');

const sourceDirectory = 'twig/';
const destinationDirectory = 'docs/';
const pageTemplateRegex = new RegExp('^[^_].*\\.twig$');

async function renderDir(path) {
  const dir = await fs.promises.opendir(path);

  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      renderDir(dirent.path + dirent.name + '/');
    }

    if (dirent.isFile() && pageTemplateRegex.test(dirent.name)) {
        let source = dirent.path + dirent.name;
        let destination = source.replace(sourceDirectory, destinationDirectory); // TODO: simplify
        destination = destination.replace('.twig', '.html');

        renderPage(source, destination);
    }
  }
}

function renderPage(source, destination) {
  Twig.renderFile(source, {/*data:'here'*/}, (err, html) => {
    if (err) throw err;

    const dirname = path.dirname(destination);
    fs.mkdir(dirname, { recursive: true }, (err) => {
      if (err) throw err;
    });

    fs.writeFileSync(destination, html.trim());
  });
}

renderDir(sourceDirectory).catch(console.error);
