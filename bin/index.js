"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const promises_1 = require("node:fs/promises");
// @ts-ignore
const font_carrier_1 = __importDefault(require("font-carrier"));
const chalk_1 = __importDefault(require("chalk"));
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
function iconFontGenerate({ iconPath, fontFamily: family, classPrefix, codeStart, output: outputPath, outputFileName, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const fontFamily = family || 'icomoon';
        const font = font_carrier_1.default.create();
        const svgList = yield (0, promises_1.readdir)(iconPath);
        const icons = [];
        let num = typeof codeStart === 'number' ? codeStart : 1;
        for (const fileName of svgList) {
            if (/\.svg$/.test(fileName)) {
                const code = num.toString(16).padStart(3, '0');
                // eslint-disable-next-line no-await-in-loop
                const svg = yield (0, promises_1.readFile)(path_1.default.resolve(iconPath, fileName), { encoding: 'utf8' });
                font.setSvg(`&#xe${code};`, svg);
                icons.push({
                    name: fileName.replace('.svg', ''),
                    code,
                });
                num++;
            }
        }
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
        yield (0, promises_1.writeFile)(path_1.default.resolve(outputPath, fileName), iconCssStr, { encoding: 'utf8' });
        console.log(chalk_1.default.green(`字体图标 ${fontFamily} 生成完成!`));
    });
}
exports.default = iconFontGenerate;
