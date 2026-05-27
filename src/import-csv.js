import fs from 'node:fs';
import { parse } from 'csv-parse';

const csvPath = new URL('./tasks.csv', import.meta.url);

async function run() {
  const readStream = fs.createReadStream(csvPath);

  const parser = readStream.pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    })
  );

  console.log('--- Iniciando importação do CSV ---');

  for await (const record of parser) {

    const { title, description } = record;

    console.log(`Enviando: ${title}`);

    const response = await fetch('http://localhost:3333/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    console.log(`Status do envio: ${response.status}, OK: ${response.ok}`);
  }
}

run();