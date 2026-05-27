import fs from 'node:fs';
import { parse } from 'csv-parse';

// Caminho para o seu arquivo CSV real
const csvPath = new URL('./tasks.csv', import.meta.url);

async function run() {
  // 1. Cria a stream de leitura do arquivo real
  const readStream = fs.createReadStream(csvPath);

  // 2. Configura o parser do CSV
  const parser = readStream.pipe(
    parse({
      columns: true, // Transforma cada linha em um objeto usando o cabeçalho (ex: { title: '...', description: '...' })
      skip_empty_lines: true, // Ignora linhas em branco bobas no fim do arquivo
    })
  );

  console.log('--- Iniciando importação do CSV ---');

  // 3. Itera por cada linha do seu arquivo real
  for await (const record of parser) {
    // Record agora é um objeto: { title: 'Task 01', description: 'Descrição da Task 01' }
    const { title, description } = record;

    console.log(`Enviando: ${title}`);

    // 4. Faz a requisição HTTP POST para a API Node.js para criar a tarefa
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