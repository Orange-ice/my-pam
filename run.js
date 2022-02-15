/* v 0.0.3 */
const {
          dev,
          version,
          name
      } = require("./package");
const fs = require("fs");
const env = process.argv[2] || ""; // dev 调试模式
const indexPaths = [
    "./src/index.tsx"
    // 多入口需要在此添加入口文件，以便自动切换模式
];

function run(path) {
    console.log('rewite index: ', path);
    const data = fs.readFileSync(path);
    const index = data.toString().replace(/(\/\* @dynamic (.*?) \*\/\n*\n*\r*\s*\t*)(.*?)(\n*\n*\r*\s*\t*\/\* @dynamic end \*\/)/gi, (a, s1, s2, s3, s4) => {
        let code = "";
        switch(s2) {
            case "debug":
                code = env === "dev" ? `import Debugger from '@paraview/lib/debugger';\n` : '';
                break;
            case "Debugger":
                code = env === "dev" ? `await Debugger.init(debug);` : `await Context.load(${env === "dev-cbu" ? "\"" + dev.context + "\"" : ""});`;
                break;
            case "init":
                code = env === "dev" ? `init(${JSON.stringify(dev.debug || [])})` : "init();";
                break;
            case "version":
                code = `window.ParaWeb = {name:'${name}',version: '${version}', env: '${env || ""}', buildTime: '${new Date().toLocaleString()}'}`;
                break;
        }
        return `${s1}${code}${s4}`;
    });
    try {
        fs.writeFileSync(path, index);
    } catch(err) {
        console.log(err);
    }
}

indexPaths.forEach(p => run(p));
console.log("React Cli Running...");
