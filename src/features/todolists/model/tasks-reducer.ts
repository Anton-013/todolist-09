import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import type { TasksState } from '@/app/App'
import { createTodolistAC, deleteTodolistAC } from './todolists-reducer'

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTasks')
export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTask')
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
      if (index !== -1) state[action.payload.todolistId].splice(index, 1)
    })
    .addCase(createTaskAC, (state, action) => {
      const { title, todolistId } = action.payload
      const newTask = { id: nanoid(), title, isDone: false }
      state[todolistId].unshift(newTask)
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const { isDone, taskId, todolistId } = action.payload
      const task = state[todolistId].find(task => task.id === taskId)
      if (task) task.isDone = isDone
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const { taskId, title, todolistId } = action.payload
      const task = state[todolistId].find(task => task.id === taskId)
      if (task) task.title = title
    })
})
