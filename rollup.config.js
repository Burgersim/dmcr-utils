import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import polyfills from 'rollup-plugin-polyfill-node'
import pkg from "./package.json";

export default [
    {
        input: "src/index.js", // your entry point
        output: {
            name: "dmcr-utils", // package name
            file: pkg.browser,
            format: "umd",
        },
        plugins: [
            resolve(),
            commonjs(),
            json(),
            polyfills(),
            babel({
                exclude: ["node_modules/**"],
            }),
        ],
    },
    {
        input: "src/index.js", // your entry point
        output: [
            { file: pkg.main, format: "cjs" },
            { file: pkg.module, format: "es" },
        ],
        plugins: [
            babel({
                exclude: ["node_modules/**"],
            }),
        ],
    },
];