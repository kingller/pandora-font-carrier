#!/usr/bin/env node

import yargs from 'yargs';
import type { Arguments } from 'yargs';
import path from 'path';
import iconFontGenerate from './index';
import type { IOptions } from './index';

const argv = yargs
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
    .alias('h', 'help').argv as Arguments<IOptions>;

const iconPath = path.resolve(process.cwd(), argv.iconPath);
const outputPath = path.resolve(process.cwd(), argv.output);

iconFontGenerate({
    iconPath,
    fontFamily: argv.fontFamily,
    classPrefix: argv.classPrefix,
    codeStart: argv.codeStart,
    output: outputPath,
    outputFileName: argv.outputFileName,
}).catch((err) => {
    console.error('生成字体图标出错：', err);
});
