// TODO: rewrite

const Twig = require('twig');
const fs = require('fs');
const path = require('path');
const pretty = require('pretty');

const sourceDirectory = 'twig/';
const destinationDirectory = 'docs/';
const pageTemplateRegex = new RegExp('^[^_].*\\.twig$');

// create pages without "_" prefix
renderDir(sourceDirectory, pageTemplateRegex, sourceDirectory, destinationDirectory);
// special case for analyser page
let analysesResults = readJSON('tmp/analyses-results.json');

renderPage('twig/_analyser.twig', 'docs/analyser.html', {
  repositories: analysesResults,
});

function renderDir(startPath, pageTemplateRegex, sourceDirectory, destinationDirectory) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  let files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      renderDir(filename, pageTemplateRegex, sourceDirectory, destinationDirectory); //recurse
    } else if (stat.isFile() && pageTemplateRegex.test(files[i])) {
      let destination = destinationDirectory + filename.slice(sourceDirectory.length);
      destination = destination.replace(new RegExp('.twig$'), '.html');
      renderPage(filename, destination);
    }
  };
}

function renderPage(source, destination, data = {}) {
  console.log(source, destination);
  Twig.renderFile(source, data, (err, html) => {
    if (err) throw err;

    const dirname = path.dirname(destination);
    fs.mkdir(dirname, { recursive: true }, (err) => {
      if (err) throw err;
    });

    fs.writeFileSync(destination, pretty(html));
  });
}

function readJSON(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath);
    
    return JSON.parse(content);
  }
}
