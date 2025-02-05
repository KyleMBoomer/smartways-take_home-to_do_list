import { useState, useEffect } from 'react'

interface Task {
    name: string,
    time: string
}

interface CompletedTaskProps {
    reassignTask: (task: Task) => void
}

const CompletedTasks: React.FC<CompletedTaskProps> = ({ reassignTask }) => {
    const [completedTasks, setCompletedTasks] = useState<Task[]>([])

    useEffect(() => {
        const savedCompletedTasks = localStorage.getItem('completedTasks')
        if (savedCompletedTasks) {
            setCompletedTasks(JSON.parse(savedCompletedTasks))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
    }, [completedTasks])

    const handleReassign = (taskIndex: number) => {
        const taskToReassign = completedTasks[taskIndex]
        setCompletedTasks((prev) => prev.filter((_, index) => index !== taskIndex))
        reassignTask(taskToReassign)
    }

    return (
        <div className='completed-tasks'>
            <h3>Completed Tasks</h3>
            {completedTasks.length === 0 ? (
                <p>No completed tasks... yet!</p>
            ) : (
                <ul>
                    {completedTasks.map((task, index) => (
                        <li key={index}>
                            <span>{task.time} - {task.name}</span>
                            <button onClick={() => handleReassign(index)}>Re-assign</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CompletedTasks 

