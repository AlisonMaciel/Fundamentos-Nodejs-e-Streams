import {randomUUID} from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const db = new Database()

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
    const {search} = req.query
    console.log(search)
    res.setHeader("Content-Type", "application/json")
    return res.end(JSON.stringify(db.select("tasks", search ? {
      title: search,
      description: search
    } : null)))
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const {title, description, completed_at, created_at, updated_at} = req.body
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }
      
      db.insert("tasks", task)
      
      return res.end("Task created")
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const {id} = req.params
      db.delete("tasks", id)
      return res.end("Task deleted")
    }
  },
    {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const {id} = req.params
      const {title, description, updated_at} = req.body

      db.update("tasks", id, {title, description, updated_at: new Date()})
      return res.end("Task updated")
    }
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const {id} = req.params
      const {completed_at, updated_at} = req.body
      db.update("tasks", id, {completed_at, updated_at: new Date()})
      return res.end("Task marked as complete")
    }
  }
]