import { useState, useEffect } from 'react'

interface Task {
    name: string,
    time: string
}

interface CompletedTaskProps {
    completedTasks: Task[]
    reassignTask: (task: Task) => void
}

const CompletedTasks: React.FC<CompletedTaskProps> = ({ completedTasks, reassignTask }) => {

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
                            <button onClick={() => reassignTask(task)}>Re-assign</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CompletedTasks 

