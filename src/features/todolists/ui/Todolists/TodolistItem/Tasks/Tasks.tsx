import List from "@mui/material/List"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { Task, Todolist } from "@/app/App"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem"
import { selectTasks } from "@/features/todolists/model/tasks-selector"

type Props = {
    todolist: Todolist
}

export const Tasks = ({ todolist }: Props) => {

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[todolist.id]
    let filteredTasks = todolistTasks
    if (todolist.filter === 'active') {
        filteredTasks = todolistTasks.filter((task: Task) => !task.isDone)
    }
    if (todolist.filter === 'completed') {
        filteredTasks = todolistTasks.filter((task: Task) => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map((task: Task) => (
                            <TaskItem key={task.id} task={task} todolistId={todolist.id}/>
                    ))}
                </List>
            )}
        </>
    )
}