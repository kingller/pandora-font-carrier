# pandora-icon-font
Convert svg to font

## Install

```
npm i pandora-icon-font
```

### Using With Command

```
{
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


## 输出结果

![icon-font-output.png](https://ipfs.io/ipfs/QmZ53F5nFVfD6YueZCm1yraPp1HZc1gMWnLDx53otq3PiZ?filename=icon-font-output.png)
