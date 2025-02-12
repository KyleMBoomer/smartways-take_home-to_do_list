import { useState } from "react";

interface TaskFormProps {
    addTask: (task: string, day: string, time: string) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
    const [task, setTask] = useState('')
    const [day, setDay] = useState('Monday')
    const [time, setTime] = useState('20:00')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!task.trim()) return
        addTask(task, day, time)
        setTask('')
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit} className='task-form'>
                <input
                    type='text'
                    placeholder="What would you like to do?"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <select value={day} aria-label='day-select' onChange={(e) => setDay(e.target.value)}>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
                <input type='time' aria-label='time input' value={time} onChange={(e) => setTime(e.target.value)} required />
                <button type='submit'>Add Task</button>
            </form>
        </div>
    )
}

export default TaskForm