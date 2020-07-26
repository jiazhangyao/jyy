# tsc命令

* tsc --init
* "./src", "./dist"
* tsc -w

# never类型

```
function error(message): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
    }
}
```
