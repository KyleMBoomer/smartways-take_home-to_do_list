import { useState, useEffect } from 'react'

interface Task {
    name: string,
    time: string
}

interface CompletedTaskProps {
    completedTasks: Task[]
    reassignTask: (task: Task) => void
    clearCompletedTasks: () => void 
}

const CompletedTasks: React.FC<CompletedTaskProps> = ({ completedTasks, reassignTask, clearCompletedTasks }) => {
    return (
        <div className='completed-tasks'>
            <h3>Completed Tasks</h3>
            {completedTasks.length === 0 ? (
                <p>No completed tasks... yet!</p>
            ) : (
                <>
                <button onClick={clearCompletedTasks} className='clear-button'>Clear All</button>
                <ul>
                    {completedTasks.map((task, index) => (
                        <li key={index}>
                            <span>{task.time} - {task.name}</span>
                            <button onClick={() => reassignTask(task)}>Schedule Again?</button>
                        </li>
                    ))}
                </ul>
                </>
            )}
        </div>
    )
}
export default CompletedTasks 

