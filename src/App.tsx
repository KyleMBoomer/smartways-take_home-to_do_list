import { useState, useEffect } from 'react'
import TaskForm from './TaskForm'
import TaskBoard from './TaskBoard'
import CompletedTasks from './CompletedTasks'
import ReassignModal from './ReassignModal'
import './App.css'

interface Task {
  name: string
  time: string
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<{ [day: string]: Task[] }>({})
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])
  const [modalTask, setModalTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    const savedCompleted = localStorage.getItem('completedTasks')

    if (savedTasks) setTasks(JSON.parse(savedTasks))
    if (savedCompleted) setCompletedTasks(JSON.parse(savedCompleted))
  }, [])

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
  }, [completedTasks])

  const addTask = (task: string, day: string, time: string) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev, [day]: [...(prev[day] || []), { name: task, time }] }
      return updatedTasks
    })
  }

  const moveToCompleted = (task: Task, day:string) => {
    setTasks((prev) => {
      const updatedTasks = {...prev }
      
      updatedTasks[day] = updatedTasks[day].filter((t) => t !== task)

      if(updatedTasks[day].length === 0) {
        delete updatedTasks[day]
      }
      return updatedTasks 
    })
    setCompletedTasks((prev) => [...prev, task])
  }

  const openReassignModal = (task: Task) => {
    setModalTask(task)
    setIsModalOpen(true)
  }

  const reassignTask = (task: Task, newDay: string, newTime: string) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev, [newDay]: [...(prev[newDay] || []), { name: task.name, time: newTime }] }
      return updatedTasks
    })

    setCompletedTasks((prev) => prev.filter((t) => t !== task))
    setIsModalOpen(false)
  }


return (
  <div className='app-container'>
    <h1>To-Do List App</h1>
    <TaskForm addTask={addTask} />
    <TaskBoard tasks={tasks} moveToCompleted={moveToCompleted} />
    <CompletedTasks completedTasks={completedTasks} reassignTask={openReassignModal} />
    <ReassignModal task={modalTask} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onReassign={reassignTask} />
  </div>
)

}

export default App