const path = require('path');

const rEjsInclude = /<%\s*include\s+(\S+)\s*%>/g; // ejs 嵌套模版语法
const rFile = /\.[^\.]+$/; // 验证是否是文件
const map = fis.compile.lang;

/**
 * 绝对路径转成相对路径
 * 
 * @param {string} url    文件产出后的绝对路径
 * @param {string} dir    参考目录
 * @returns 相对路径
 */
const getRelativeUrl = (url, dir) => {
    if (rFile.test(dir)) {
        dir = path.dirname(dir);
    }
    url = path.relative(dir, url);
    return url.replace(/\\/g, '/');
}

/**
 * 标准化解析时执行，添加标记
 * 
 * @param {object} file 文件对象
 * @param {object} message.file 所在文件信息
 * @param {object} message.info 嵌套文件信息
 */
const onStandardHtml = (message) => {
    const file = message.file;

    if (!file.isText() || file.isInline) {
        return;
    }

    message.content = message.content.replace(rEjsInclude, (m, uri) => {
        if (!uri) return m;

        // 添加依赖
        const message = fis.project.lookup(uri, file);
        if (message && message.id) {
            file.addRequire(message.id);
        }

        return '<% include ' + map.uri.wrap(uri) + ' %>';
    });
};

/**
 * 中间码转源码时执行，解析标记
 * 
 * @param {object} message
 * @param {object} message.file 所在文件信息
 * @param {object} message.info 嵌套文件信息
 */
const onStandardRestoreUri = (message) => {
    const file = message.file;
    const info = message.info;

    if (!info || !info.file || !file.isText() || file.isInline) {
        return;
    }

    message.ret = getRelativeUrl(info.file.release, file.release);
};

module.exports = (fis) => {
    fis.on('standard:html', onStandardHtml);
    fis.on('standard:restore:uri', onStandardRestoreUri);
};