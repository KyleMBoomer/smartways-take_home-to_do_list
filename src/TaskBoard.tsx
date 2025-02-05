import { useEffect, useState } from "react";

interface Task {
    name: string;
    time: string;
}

interface TaskBoardProps {
    moveToCompleted: (task: Task) => void
}

const TaskBoard: React.FC<TaskBoardProps> = ({ moveToCompleted }) => {
    const [tasks, setTasks] = useState<{ [day: string]: Task[] }>({})

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks')
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const handleComplete = (day: string, taskIndex: number) => {
        const updatedTasks = { ...tasks }
        const completedTask = updatedTasks[day][taskIndex]

        updatedTasks[day].splice(taskIndex, 1)
        if (updatedTasks[day].length === 0) {
            delete updatedTasks[day]
        }

        setTasks(updatedTasks)
        moveToCompleted(completedTask)
    }

    return (
        <div className='task-board'>
            {Object.keys(tasks).length === 0 ? <p>No tasks yet!</p> : null}
            {Object.entries(tasks).map(([day, taskList]) => (
                <div key={day} className='task-day'>
                    <h3>{day}</h3>
                    <ul>
                        {taskList.map((task, index) => (
                            <li key={index}>
                                <span>{task.time} - {task.name}</span>
                                <input
                                    type='checkbox'
                                    onChange={() => handleComplete(day, index)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default TaskBoard 