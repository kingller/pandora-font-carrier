#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import fontCarrier from 'font-carrier';

function getIconCss({
    fontFamily,
    classPrefix,
    icons,
}: {
    fontFamily: string;
    classPrefix?: string;
    icons: { name: string; code: string }[];
}) {
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

function iconBuild({
    fontFamily: family,
    classPrefix,
    iconPath,
    codeStart,
    output: outputPath,
    outputFileName,
}: {
    /** 字体图标名称 */
    fontFamily?: string;
    /** 字体图标类名前缀 */
    classPrefix?: string;
    /** 图标文件夹路径 */
    iconPath: string;
    /** 字体图标编码起始值 */
    codeStart?: number;
    /** 输出路径 */
    output: string;
    /** 输出字体图标文件名 */
    outputFileName?: string;
}) {
    const fontFamily = family || 'icomoon';
    const font = fontCarrier.create();
    const svgList = fs.readdirSync(iconPath);
    const icons: { name: string; code: string }[] = [];
    let num = typeof codeStart === 'number' ? codeStart : 1;
    svgList.forEach(function (fileName) {
        if (/\.svg$/.test(fileName)) {
            const code = num.toString(16).padStart(3, '0');
            font.setSvg(`&#xe${code};`, fs.readFileSync(path.resolve(iconPath, fileName)).toString());
            icons.push({
                name: fileName.replace('.svg', ''),
                code,
            });
            num++;
        }
    });
    font.output({
        path: `${path.resolve(outputPath, 'fonts')}/${fontFamily}`,
        types: ['woff'],
    });
    const iconCssStr = getIconCss({
        fontFamily,
        classPrefix,
        icons,
    });
    const fileName = outputFileName || 'iconfont.css';
    fs.writeFileSync(path.resolve(outputPath, fileName), iconCssStr, { encoding: 'utf8' });

    // eslint-disable-next-line no-console
    console.log(`字体图标 ${fontFamily} 生成完成!`);
}
