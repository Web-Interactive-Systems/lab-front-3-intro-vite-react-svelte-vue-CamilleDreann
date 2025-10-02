import fs from "fs";
import path from "path";

const banner = `/*!
 * My Vite App - built by [Your Name]
 * Build date: ${new Date().toISOString()}
 */n`;

const assetsDir = path.resolve("dist/assets");

for (const file of fs.readdirSync(assetsDir)) {
    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
    }
    // js file
    // file path.. path.join(assetsDir, file)
    // read.. fs.readFileSync(filePath, "utf8")
    // prepend banner
    // write.. fs.writeFileSync(filePath, newCode, "utf8");
    console.log(banner);
    console.log(`Banner added to ${file}`);
}