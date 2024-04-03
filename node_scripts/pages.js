const fs = require('node:fs');
const Pages = require('pages/commonjs/pages.cjs');

const pages = new Pages();

pages.run('twig', 'docs');

const analysesResults = readJSON('tmp/analyses-results.json');
pages.renderPage('twig/_analyser.twig', 'docs/analyser.html', {
  repositories: analysesResults,
});

function readJSON(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath);
    
    return JSON.parse(content);
  }
}
