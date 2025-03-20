import { defineConfig } from "vite"; // vite 配置文件
import terser from "@rollup/plugin-terser"; // 压缩插件
import {
    version, // 版本号
    writeCopyrightPlugin, // 引入版权信息写入插件
} from "./src/outputConfig.ts";


/* ========== */


/* 打包选项 */

const name = "StorageProviderPlugin"; // 库的名称
const pluginOptions = [ // 打包插件选项
    terser({
        compress: {
            drop_console: false, // console 日志
            drop_debugger: true // debugger 语句
        },
        mangle: true, // 变量名
        output: {
            comments: false, // 移除注释
        }
    }),
    writeCopyrightPlugin(), // 写入版权信息
];


/* ========== */


/* 输出配置 */
export default defineConfig({
    server: {
        port: 24271, // 设置服务器端口号
        open: true, // 启动时自动打开浏览器
        host: "0.0.0.0", // 允许外部访问
    },
    /* 打包配置 */
    build: {
        lib: {
            entry: "./lib/index.ts",
            name,
            fileName: (format, entryName) => `${entryName}.${format}.${version}.js`,
        },
        rollupOptions: {
            input: {
                [name]: "./lib/index.ts",
            },
            output: [{
                dir: "dist/es", // ES 模块格式的输出目录
                format: "es",
                entryFileNames: chunkInfo => `${chunkInfo.name}.es.${version}.js`,
                globals: {},
                plugins: pluginOptions
            }, {
                dir: "dist/umd", // UMD 格式模块的输出目录
                format: "umd",
                name,
                entryFileNames: chunkInfo => `${chunkInfo.name}.umd.${version}.js`,
                globals: {},
                plugins: pluginOptions
            }],
        }
    },
});