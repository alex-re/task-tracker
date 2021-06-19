import { useState } from 'react'
import { Container } from '@material-ui/core';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTaskForm from './components/AddTaskForm'

const dbTasks = [
  {
    "id": 1,
    "text": "Doctors Appointment",
    "day": "Feb 5th at 2:30pm",
    "reminder": false
  },
  {
    "id": 2,
    "text": "Meeting at School",
    "day": "Feb 6th at 1:30pm",
    "reminder": true
  }
]

function App() {
  const [tasks, setTasks] = useState(dbTasks)
  const [showAddTask, setShowAddTask] = useState(false)

  const onTaskDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const onToggleReminder = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    ))
  }

  const addTask = ({ text, day, reminder }) => {
    const id = (tasks[tasks.length - 1].id) + 1;
    // setTasks(tasks.push({ id, name, date, reminder }))
    setTasks([...tasks, { id, text, day, reminder }])
  }

  return (
    <Container maxWidth='sm'>
      <Header toggleForm={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
      {showAddTask && <AddTaskForm addTask={addTask} />}
      <Tasks onToggleReminder={onToggleReminder} tasks={tasks} onDelete={onTaskDelete} />
    </Container>
  );
}

export default App;