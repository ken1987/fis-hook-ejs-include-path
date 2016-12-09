# fis-hook-ejs-include-path

用 fis 构建时，使 ejs 嵌套模版支持相对路径，并且自动添加依赖

## 注意事项

* 源码使用了 es6 ，需要 node >= 6.0.0
* 功能比较简单，如果代码的语法和 ejs 的嵌套语法类似可能出现错误
* 当前版本不支持 ejs 配置 open 和 close

## 使用

``` html
<% include ./demo.ejs %>
```

``` js
fis.hook('ejs-include-path');
```