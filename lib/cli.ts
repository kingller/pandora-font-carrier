#!/usr/bin/env node

import yargs from 'yargs';
import type { Arguments } from 'yargs';
import path from 'path';
import chalk from 'chalk';
import iconFontGenerate from './index';
import type { IOptions } from './index';

const argv = yargs
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
    console.error(chalk.red('生成字体图标出错：', err));
});
