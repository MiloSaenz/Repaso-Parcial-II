const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const carros = [
  { id: 1, marca: 'Toyota' },
  { id: 2, marca: 'Honda' },
  { id: 3, marca: 'Ford' },
];

// helper to render and write a file
async function renderToFile(templatePath, outPath, data = {}) {
  const html = await ejs.renderFile(templatePath, data, { async: true });
  const dir = path.dirname(outPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Wrote', outPath);
}

async function main() {
  const viewsDir = path.join(__dirname, 'src', 'views', 'habitacion27');
  const outBase = path.join(__dirname, 'docs', 'habitacion27');

  // index
  await renderToFile(
    path.join(viewsDir, 'index27.ejs'),
    path.join(outBase, 'index.html'),
    { carros }
  );

  // create (no data required)
  await renderToFile(
    path.join(viewsDir, 'create27.ejs'),
    path.join(outBase, 'create', 'index.html'),
    {}
  );

  // show pages (one file per carro)
  for (const carro of carros) {
    await renderToFile(
      path.join(viewsDir, 'show27.ejs'),
      path.join(outBase, String(carro.id), 'index.html'),
      { carro }
    );
  }

  // Copy stylesheets into docs
  const srcCssDir = path.join(__dirname, 'stylesheets');
  const outCssDir = path.join(__dirname, 'docs', 'stylesheets');
  fs.mkdirSync(outCssDir, { recursive: true });
  for (const f of fs.readdirSync(srcCssDir)) {
    fs.copyFileSync(path.join(srcCssDir, f), path.join(outCssDir, f));
  }

  console.log('Static site generated into ./docs');
}

main().catch(err => { console.error(err); process.exit(1); });