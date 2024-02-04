#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const font_carrier_1 = __importDefault(require("font-carrier"));
function getIconCss({ fontFamily, classPrefix, icons, }) {
    const prefix = classPrefix || 'icon-';
    return `@font-face {
    font-family: '${fontFamily}';
    src: url('fonts/${fontFamily}.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

[class^="${prefix}"]::before,
[class*=" ${prefix}"]::before {
    font-family: '${fontFamily}' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
${icons
        .map(function ({ code, name }) {
        return `
.${prefix}${name}:before {
    content: "\\e${code}";
}`;
    })
        .join('\n')}`;
}
function iconBuild({ fontFamily: family, classPrefix, iconPath, codeStart, output: outputPath, outputFileName, }) {
    const fontFamily = family || 'icomoon';
    const font = font_carrier_1.default.create();
    const svgList = fs_1.default.readdirSync(iconPath);
    const icons = [];
    let num = typeof codeStart === 'number' ? codeStart : 1;
    svgList.forEach(function (fileName) {
        if (/\.svg$/.test(fileName)) {
            const code = num.toString(16).padStart(3, '0');
            font.setSvg(`&#xe${code};`, fs_1.default.readFileSync(path_1.default.resolve(iconPath, fileName)).toString());
            icons.push({
                name: fileName.replace('.svg', ''),
                code,
            });
            num++;
        }
    });
    font.output({
        path: `${path_1.default.resolve(outputPath, 'fonts')}/${fontFamily}`,
        types: ['woff'],
    });
    const iconCssStr = getIconCss({
        fontFamily,
        classPrefix,
        icons,
    });
    const fileName = outputFileName || 'iconfont.css';
    fs_1.default.writeFileSync(path_1.default.resolve(outputPath, fileName), iconCssStr, { encoding: 'utf8' });
    console.log(`字体图标 ${fontFamily} 生成完成!`);
}
