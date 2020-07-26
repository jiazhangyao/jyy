# ts

## Cannot find name 'require'
* 安装@types/node:npm i @types/node -S -D
* 配置tsconfig.json:
    compilerOptions内加上一项：
```
{
"compilerOptions": {
    // ...
    "types": ["node"],
    // ...
}
```

## 无法加载文件 D:\nodejs\node_global\tsc.ps1，因为在此系统上禁止运行脚本...
*  以管理员身份运行vs code—>在vscode快捷方式,右击->属性,兼容性->勾选 ‘以管理员身份运行’->确定
*  在vs code 终端中运行下面命令:    
执行：get-ExecutionPolicy，显示Restricted，表示状态是禁止的  
执行：set-ExecutionPolicy RemoteSigned  这时再执行get-ExecutionPolicy，就显示RemoteSigned

## 'new' expression, whose target lacks a construct signature, implicitly has an ‘any’ type.
```
function Nodes(this: any, ele: number) {
    this.val = ele
    this.next = null
}

const node = new (Nodes as any)(10)
console.log(node);
```

## strictPropertyInitialization，我们必须要确保每个实例的属性都会初始值，可以在构造函数里或者属性定义时赋值。
* 显式赋值断言(Definite Assignment Assertions) x!

## fromCharCode
String.fromCharCode()