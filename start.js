const path = require("path");

const baseDir = path.dirname(process.execPath);

console.log("Starting Node-RED from:", baseDir);

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

console.log("Loading Node-RED...");

try {
  // Use absolute path so pkg loads from filesystem, not snapshot
  const nodeRedPath = path.join(baseDir, "node_modules", "node-red", "bin", "node-red.js");
  require(nodeRedPath);
} catch (err) {
  console.error("Failed to load Node-RED:", err.message);
  process.stdin.resume(); // Keep terminal open
}