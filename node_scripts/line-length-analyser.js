const path = require('node:path');
const RepositoriesDownloader = require('../modules/line-length-analyser/commonjs/repositories-downloader.js');
const LineLengthAnalyser = require('../modules/line-length-analyser/commonjs/line-length-analyser.js');

async function main() {
    const downloader = new RepositoriesDownloader('tmp/archives', 'tmp/analys-repos');
    console.log(path.resolve(__dirname, '../config/line-length-repositories.json'));
    downloader.addArchivesFromFile(path.resolve(__dirname, '../config/line-length-repositories.json'));
    
    const downloadedRepositories = await downloader.download();

    const jsSettings = {
        extensions: ['.js'],
        excludePattern: /^.*(\.min\.|gulpfile\.js).*$/i,
        line: {
            filter: line => line.trim(),
            ignoreLength: 3,
            commentBeginSymbols: ['//'], 
        }
    };
    const jsAnalyser = new LineLengthAnalyser(jsSettings);
    jsAnalyser.addRepository({name: 'Github pages JS', path: 'js'});
    jsAnalyser.addRepositories(downloadedRepositories);

    await jsAnalyser.run();
    jsAnalyser.saveJSON('tmp/analyses-results/js.json');

    const scssSettings = {
        extensions: ['.scss'],
        excludePattern: /^.*(\.min\.).*$/i,
        line: {
            filter: line => line.trim(),
            ignoreLength: 1,
            commentBeginSymbols: ['//'], 
        }
    };
    const scssAnalyser = new LineLengthAnalyser(scssSettings);
    scssAnalyser.addRepository({name: 'Github pages SCSS', path: 'scss'});

    await scssAnalyser.run();
    scssAnalyser.saveJSON('tmp/analyses-results/scss.json');

    console.log('Analyser finished!');

}

main();
