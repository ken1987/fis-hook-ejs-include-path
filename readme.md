# fis-hook-ejs-include-path

用 fis 构建时，使 ejs 嵌套模版支持相对路径，并且自动添加依赖

## 注意事项

源码使用了 es6 ，需要 node >= 6.0.0

## 使用

``` html
<% include ./demo.ejs %>
```

``` js
fis.hook('ejs-include-path');
```