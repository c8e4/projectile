import fs from 'fs';

const data = fs.readFileSync('./data.txt', {encoding:'utf8', flag:'r'});
const lines = data.split('\n');

const json = lines.map((line,i) => {
    return line.split('\t');
}).filter(x=>x).map(s => {
    return {
        name: s[0],
        index: s[1],
        amount: s[2],
        center: (s[s.length-1]=='null'?null:s[s.length-1]),
        connectors: s.splice(3).toSpliced(-1,1).map(x => x=='null'?null:x),
    }
})

console.dir(json)