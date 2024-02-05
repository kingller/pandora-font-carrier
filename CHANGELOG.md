标签：
<font color=green>新增</font>
<font color=orange>修改</font>
<font color=blue>增强</font>
<font color=red>修复</font>
<font color=red><strong>删除</strong></font>


# Next


# 0.0.2
1. <font color=red>修复</font> 执行时 `chalk` 报错，改为使用 `4.x.x`
```
const chalk_1 = __importDefault(require("chalk"));
                                ^

Error [ERR_REQUIRE_ESM]: require() of ES Module node_modules/.pnpm/chalk@5.3.0/node_modules/chalk/source/index.js from xx not supported.
```
