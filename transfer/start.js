const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");

// try { require("node-hide-console-window").hide(); } catch(e) {}

const baseDir = process.pkg ? path.dirname(process.execPath) : __dirname;

process.argv = [
  process.execPath,
  "node-red",
  "-s",
  path.join(baseDir, "settings.js"),
  path.join(baseDir, "flows.json")
];

process.env.NODE_PATH = path.join(baseDir, "node_modules");
process.env.NODE_RED_HOME = baseDir;

require("module").Module._initPaths();

try {
  const nodeRedPath = path.join(baseDir, "node_modules", "node-red", "red.js");
  require(nodeRedPath);
} catch (err) {
  process.exit(1);
}

const SysTray = require("systray2").default;

const iconPath = path.join(__dirname, "icon", "jetpace.ico");
const icon = fs.readFileSync(iconPath).toString("base64");

const tray = new SysTray({
  menu: {
    icon,
    isTemplateIcon: false,
    title: "",
    tooltip: "Jetpace EMS",
    items: [
      { title: "Open Dashboard", tooltip: "", checked: false, enabled: true },
      { title: "Quit",           tooltip: "", checked: false, enabled: true },
    ],
  },
  debug: false,
  copyDir: true,
});

tray.onClick(action => {
  if (action.seq_id === 0) {
    exec("start http://localhost:1880/dashboard");
  } else if (action.seq_id === 1) {
    tray.kill(true);
    process.exit(0);
  }
});
