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
declare function iconFontGenerate({ iconPath, fontFamily: family, classPrefix, codeStart, output: outputPath, outputFileName, }: IOptions): Promise<void>;
export default iconFontGenerate;
