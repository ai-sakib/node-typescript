import { Router } from 'express'
import Todo from '../models/todo'

const router = Router()

const todos: Array<Todo> = []

type RequestBody = { text: string }
type RequestParams = { todoId: string }

router.get('/todo', (req, res) => {
    res.status(200).json({ todos: todos })
})

router.post('/todo', (req, res) => {
    const body = req.body as RequestBody
    const text = body.text
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: text,
    }
    todos.push(newTodo)
    res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo })
})

router.put('/todo/:todoId', (req, res) => {
    const params = req.params as RequestParams
    const body = req.body as RequestBody

    const id = params.todoId
    const newText = body.text
    const todoIndex = todos.findIndex(todo => todo.id === id)
    if (todoIndex < 0) {
        throw new Error('Could not find todo!')
    }
    todos[todoIndex] = { id: todos[todoIndex].id, text: newText }
    res.status(200).json({
        message: 'Updated todo.',
        updatedTodo: todos[todoIndex],
    })
})

router.delete('/todo/:todoId', (req, res) => {
    const params = req.params as RequestParams
    const id = params.todoId
    const todoIndex = todos.findIndex(todo => todo.id === id)
    if (todoIndex < 0) {
        throw new Error('Could not find todo!')
    }
    todos.splice(todoIndex, 1)
    res.status(200).json({ message: 'Deleted todo.' })
})

export default router
