#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const index_1 = __importDefault(require("./index"));
const argv = yargs_1.default
    .option('iconPath', {
    alias: 'i',
    type: 'string',
    description: 'Svg directory, generates fonts',
})
    .option('output', {
    alias: 'o',
    type: 'string',
    description: 'Output directory',
})
    .option('fontFamily', {
    type: 'string',
    description: 'Font family',
})
    .option('classPrefix', {
    type: 'string',
    description: 'Font icon class name prefix',
})
    .option('codeStart', {
    alias: 's',
    type: 'number',
    description: 'Font icon encoding starting value',
})
    .option('outputFileName', {
    type: 'string',
    description: 'Output font icon file name',
})
    .demandOption(['iconPath', 'output'])
    .help('h')
    .alias('h', 'help').argv;
const iconPath = path_1.default.resolve(process.cwd(), argv.iconPath);
const outputPath = path_1.default.resolve(process.cwd(), argv.output);
(0, index_1.default)({
    iconPath,
    fontFamily: argv.fontFamily,
    classPrefix: argv.classPrefix,
    codeStart: argv.codeStart,
    output: outputPath,
    outputFileName: argv.outputFileName,
}).catch((err) => {
    console.error(chalk_1.default.red('生成字体图标出错：', err));
});
