import fs from "fs";
import { pennants } from "./pennants.js";

const data = fs.readFileSync("./data.txt", { encoding: "utf8", flag: "r" });
const lines = data.split("\n");

const json = lines
    .map((line, i) => {
        return line.split("\t");
    })
    .filter((x) => x)
    .map((s) => {
        return {
            name: s[0],
            index: +s[1],
            amount: +s[2],
            center: s[15] == "null" ? null : s[15],
            deg: 0,
            connectors: [
                s[3],
                s[4],
                s[5],
                s[6],
                s[7],
                s[8],
                s[9],
                s[10],
                s[11],
                s[12],
                s[13],
                s[14],
            ].map((x) => (x == "null" ? null : x)),
            dropZone: [
                s[16],
                s[17],
                s[18],
                s[19],
                s[20],
                s[21],
                s[22],
                s[23],
                s[24],
                s[25],
                s[26],
                s[27],
            ].map((x) => (x == "null" ? null : x)),
            dropZoneCenter: s[28] == "null" ? null : s[28],
            zamokPoleLinks: s[29]?s[29].split(',').map(x=>{return{zamok:x.split(':')[0],pole:x.split(':')[1]}}):null, 
            meeple:null,
            pennant: pennants.find(p => p.tileName==s[0])?.connectorName??null
        };
    });

console.log("export let tiles =");
console.dir(json, {depth:null});
