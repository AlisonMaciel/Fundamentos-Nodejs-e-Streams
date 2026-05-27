# 🚀 Task Manager API - Desafio Node.js

Uma API robusta para gerenciamento de tarefas (CRUD) desenvolvida do zero em Node.js nativo, sem a utilização de frameworks (como Express). O projeto inclui persistência de dados local em arquivo JSON e um sistema inteligente de importação massiva de dados a partir de arquivos CSV utilizando Node.js Streams.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte dos desafios da trilha Node.js. O objetivo principal foi consolidar os fundamentos da linguagem, compreendendo na prática como o Node.js lida com requisições HTTP, buffers, fluxos de dados (Streams), tratamento de rotas com Regex, middlewares customizados e manipulação do sistema de arquivos (`fs`).

## ⚙️ Funcionalidades e Rotas Desenvolvidas

A API conta com um CRUD completo para gerenciar as tarefas, além do script de automação:

* **`POST - /tasks`**: Cria uma nova tarefa. O corpo da requisição recebe `title` e `description`. Os campos `id`, `created_at`, `updated_at` e `completed_at` são gerados automaticamente pelo servidor.
* **`GET - /tasks`**: Lista todas as tarefas salvas. Suporta filtros dinâmicos por meio de *Query Params* (ex: `/tasks?search=Estudar`), permitindo buscar por termos com espaços ou acentos tanto no título quanto na descrição.
* **`PUT - /tasks/:id`**: Atualiza o `title` e/ou a `description` de uma tarefa específica baseada no ID passado por parâmetro. Atualiza automaticamente a propriedade `updated_at`.
* **`PATCH - /tasks/:id/complete`**: Rota específica para alternar o status de conclusão da tarefa. Se estiver concluída, volta para ativa; se estiver ativa, marca como concluída preenchendo o `completed_at` com a data atual. Também atualiza o `updated_at`.
* **`DELETE - /tasks/:id`**: Remove de forma definitiva uma tarefa do banco de dados através do ID.
* **`Importador Automático (CSV)`**: Script independente que lê um arquivo `.csv`, processa as linhas linha por linha via Streams de forma extremamente leve e dispara requisições assíncronas em lote para a API.

## 🛠️ Tecnologias Utilizadas

* **Node.js** (Ambiente de execução)
* **Módulos Nativos do Node.js**:
    * `node:http` (Criação e gerenciamento do servidor HTTP)
    * `node:fs` (Manipulação e persistência no arquivo `db.json`)
    * `node:crypto` (Geração de IDs únicos com `randomUUID`)
    * `node:stream` (Manipulação eficiente de fluxos de dados)
* **Dependências de Desenvolvimento**:
    * `csv-parse` (Biblioteca utilitária para conversão e leitura de fluxos de arquivos CSV)

## 📁 Estrutura de Pastas do Projeto

```text
├── src/
│   ├── middlewares/
│   │   └── json.js           # Interceptador responsável pelo parse do corpo da requisição (Buffer para JSON)
│   ├── utils/
│   │   ├── build-route-path.js      # Converte caminhos de rotas com parâmetros em Expressões Regulares (Regex)
│   │   └── extract-query-params.js  # Utilitário para extrair e mapear Query Params da URL
│   ├── database.js           # Classe responsável por ler/escrever no db.json e gerenciar a persistência
│   ├── routes.js             # Definição e mapeamento de todas as rotas e seus respectivos handlers
│   └── server.js             # Ponto de entrada do servidor HTTP
├── tasks.csv                 # Arquivo com os dados fictícios estruturados para importação em massa
├── import-csv.js             # Script responsável por rodar a Stream de leitura e fazer o disparo do CSV
└── .gitignore                # Configuração para impedir o envio da pasta node_modules ao repositório
