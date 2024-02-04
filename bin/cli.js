#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./index"));
const argv = yargs_1.default
    .alias('i', 'iconPath')
    .describe('i', 'Svg directory')
    .alias('o', 'output')
    .describe('o', 'Output directory')
    .alias('pref', 'classPrefix')
    .describe('pref', 'Font icon class name prefix')
    .alias('s', 'codeStart')
    .describe('s', 'Font icon encoding starting value')
    .alias('f', 'outputFileName')
    .describe('f', 'Output font icon file name')
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
    console.error('生成字体图标出错：', err);
});
