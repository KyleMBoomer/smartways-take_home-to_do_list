interface Task {
    name: string;
    time: string;
}

interface TaskBoardProps {
    tasks: { [day: string]: Task[] }
    moveToCompleted: (task: Task, day:string) => void
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, moveToCompleted }) => {

    const handleComplete = (day: string, taskIndex: number) => {
        const completedTask = tasks[day][taskIndex]
        moveToCompleted(completedTask, day)
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
                                    type='checkbox' aria-label="checkbox"
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