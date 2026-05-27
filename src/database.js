import fs from "fs/promises"

export class Database {
  #database = {}

  #databaseUrl = new URL("../db.json", import.meta.url)

  constructor() { 
    fs.readFile(this.#databaseUrl, "utf-8")
      .then(data => {
        this.#database = JSON.parse(data)
      }).catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile("db.json", JSON.stringify(this.#database))
  }

  select(table, search) {
  let data = this.#database[table] ?? []

  if (search) {
    data = data.filter(item => {
      return Object.entries(search).some(([key, value]) => {

        const decodedValue = decodeURIComponent(String(value ?? ''));

        return item[key]
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, '')
          .toLowerCase()
          .includes(
            decodedValue
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, '')
              .toLowerCase()
          );
      });
    });
  }

  return data;
}

  insert(table, data) { 
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(item => item.id === id)
    if (rowIndex > -1) {
      const currentRecord = this.#database[table][rowIndex]
      this.#database[table][rowIndex] = {
        id,
        ...currentRecord, 
        ...data
      }
      this.#persist()
    }
  }

  updateIdTask(table, id, data) {
    const rowIndex = this.#database[table].findIndex(item => item.id === id)
    if (rowIndex > -1) {
      const currentRecord = this.#database[table][rowIndex]
      this.#database[table][rowIndex] = {
        ...currentRecord, 
        ...data
      }
      this.#persist()
    }
  }
  
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(item => item.id === id)
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}