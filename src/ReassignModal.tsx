import { useState } from 'react'

interface Task {
    name: string,
    time: string
}

interface ReassignModalProps {
    task: Task | null
    isOpen: boolean
    onClose: () => void
    onReassign: (task: Task, newDay: string, newTime: string) => void

}

const ReassignModal: React.FC<ReassignModalProps> = ({ task, isOpen, onClose, onReassign }) => {
    const [newDay, setNewDay] = useState('Monday')
    const [newTime, setNewTime] = useState('8:00')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!task) return

        onReassign(task, newDay, newTime)
        onClose()
    }

    if (!isOpen || !task) return null

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h3>Reassign Task</h3>
                <form onSubmit={handleSubmit}>
                    <p>Task: {task.name}</p>
                    <label>
                        Select Day:
                        <select value={newDay} onChange={(e) => setNewDay(e.target.value)}>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Select Time:
                        <input type='time' value={newTime} onChange={(e) => setNewTime(e.target.value)} />
                    </label>
                    <div className='modal-buttons'>
                        <button type='submit'>Reassign</button>
                        <button type='button' onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ReassignModal 