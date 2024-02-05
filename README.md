# pandora-icon-font
Convert svg to font

## Install

```
npm i pandora-icon-font
```

### Using With Command

```
{
  "name": "pandora",
  "version": "28.19.0",
  "description": "PC 端组件库",
  "keywords": [
    "hrone",
    "pandora",
    "react",
    "style"
  ],
  "homepage": "http://git.gaiaworks.cn:8088/fe/pandora",
  "bugs": {
    "url": "http://git.gaiaworks.cn:8088/fe/pandora/issues"
  },
  "repository": {
    "type": "git",
    "url": "git@git.gaiaworks.cn:fe/pandora.git"
  },
  "author": "gaia design ui team",
  "files": [
    "dest/",
    "src/",
    "lib/",
    "postinstall/",
    "package.json",
    "tsconfig.json",
    ".eslintrc.js",
    ".prettierrc.js",
    "README.md",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "babel.config.js",
    "chunk.config.js",
    "gulpfile.js",
    "externals.config.js",
    "webpack.alias.js",
    "webpack.base.config.js",
    "webpack.example.config.js",
    "webpack.externals.js",
    "webpack.lib.config.js",
    "webpack.template.config.js"
  ],
  "main": "./src/index.ts",
  "module": "./src/index.ts",
  "scripts": {
    "iconfont": "iconfont --iconPath ./src/css/core/svg --output ./src/css/core",
  },
}
```

add configuration to package.json. 

And run the command

```
npm run iconfont
```

## Using With Nodejs

```
const path = require('path');
const iconFont = require('pandora-icon-font');

iconFont({
    iconPath: path.resolve(process.cwd(), './src/css/core/svg'), // svg path
    output: path.resolve(process.cwd(), './src/css/core'), // output path
});
```

## API

### iconPath

`Required`.

Svg directory, generates fonts.

图标（svg）文件夹路径，用来生成字体。

### output

`Required`.

Output directory.

输出路径。

### fontFamily

`Optional`.

default: `icomoon`.

Font family.

字体图标名称。

### classPrefix

`Optional`.

default: `icon-`.

Font icon class name prefix.

字体图标类名前缀。

### codeStart

`Optional`.

Font icon encoding starting value.

字体图标编码起始值。

### outputFileName

`Optional`.

default: `iconfont.css`.

Output font icon file name.

输出字体图标文件名。
