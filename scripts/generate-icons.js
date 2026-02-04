// Simple script to generate placeholder PWA icons
// Run: node scripts/generate-icons.js
// Note: Replace these with your actual app icons before production

import { writeFileSync, mkdirSync, existsSync } from "fs";

const iconsDir = "./public/icons";

// Ensure icons directory exists
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

// Generate a simple SVG placeholder and convert to data URL for each size
function generatePlaceholderSVG(size, text) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="#000"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-family="system-ui" font-size="${size / 4}" font-weight="bold">${text}</text>
</svg>`;
}

// For development, we'll create SVG files that will work
// In production, replace with actual PNG icons
const sizes = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

sizes.forEach(({ name, size }) => {
  const svgName = name.replace(".png", ".svg");
  const svg = generatePlaceholderSVG(size, "PWA");
  writeFileSync(`${iconsDir}/${svgName}`, svg);
  console.log(`Created ${svgName}`);
});

console.log("\\nPlaceholder icons created!");
console.log("Note: Replace these SVG files with actual PNG icons before production.");
console.log("You can use tools like https://realfavicongenerator.net/ to generate proper icons.");
