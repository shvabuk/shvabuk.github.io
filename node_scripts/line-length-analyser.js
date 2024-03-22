import LineLengthAnalyser from 'line-length-analyser';
import repositories from '../config/line-length-repositories.js';

const analyser = new LineLengthAnalyser();
analyser.addRepositories(repositories);

await analyser.run();
const JSONPath = analyser.saveJSON('tmp/analyses-results.json');
console.log(`File: "${JSONPath}" created.`);
