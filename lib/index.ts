import path from 'path';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import fontCarrier from 'font-carrier';
import chalk from 'chalk';

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

export interface IOptions {
    /** 图标文件夹路径 */
    iconPath: string;
    /** 字体图标名称 */
    fontFamily?: string;
    /** 字体图标类名前缀 */
    classPrefix?: string;
    /** 字体图标编码起始值 */
    codeStart?: number;
    /** 输出路径 */
    output: string;
    /** 输出字体图标文件名 */
    outputFileName?: string;
}

async function iconFontGenerate({
    iconPath,
    fontFamily: family,
    classPrefix,
    codeStart,
    output: outputPath,
    outputFileName,
}: IOptions) {
    const fontFamily = family || 'icomoon';
    const font = fontCarrier.create();
    const svgList = await readdir(iconPath);
    const icons: { name: string; code: string }[] = [];
    let num = typeof codeStart === 'number' ? codeStart : 1;
    for (const fileName of svgList) {
        if (/\.svg$/.test(fileName)) {
            const code = num.toString(16).padStart(3, '0');
            // eslint-disable-next-line no-await-in-loop
            const svg = await readFile(path.resolve(iconPath, fileName), { encoding: 'utf8' });
            font.setSvg(`&#xe${code};`, svg);
            icons.push({
                name: fileName.replace('.svg', ''),
                code,
            });
            num++;
        }
    }
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
    await writeFile(path.resolve(outputPath, fileName), iconCssStr, { encoding: 'utf8' });

    console.log(chalk.green(`字体图标 ${fontFamily} 生成完成!`));
}

export default iconFontGenerate;
