import { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTaskForm from './components/AddTaskForm'
import AuthModal from './components/AuthModal'

function App() {
    const [tasks, setTasks] = useState([])
    const [showAddTask, setShowAddTask] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        let username = localStorage.getItem('username')
        let email = localStorage.getItem('email')
        if (username && email) {
            setUserData({ username, email })
        }

        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            console.log(Object.values(tasksFromServer))
            tasksFromServer && setTasks((tasksFromServer))
        }

        // getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:8000/tasks/')
        const data = await res.json()
        return data
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:8000/tasks/${id}`)
        const data = await res.json()

        return data
    }

    const deleteTask = async (id) => {
        const res = await fetch(`http://localhost:8000/tasks/${id}`, { method: "DELETE" })
        res.status === 200
            ? setTasks(tasks.filter((task) => task.id !== id))
            : alert('Error Deleting This Task')
    }

    const toggleReminder = async (id) => {
        const taskToToggle = tasks.find((task) => task.id === id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
        const res = await fetch(`http://localhost:8000/tasks/${id}/`, {
            method: 'PUT', headers: 'application/json', body: JSON.stringify(updTask)
        })
        const data = await res.json()
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )
        )
    }

    const addTask = async (task) => {
        const res = await fetch('http://localhost:8000/tasks/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task)
        })
        const data = await res.json()
        setTasks([...tasks, data])
    }

    const saveUserData = (data) => {
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)
        setUserData(data)
    }

    return (
        <Container maxWidth='sm'>
            <Header
                toggleForm={() => setShowAddTask(!showAddTask)}
                showAddTask={showAddTask}
                openAuthModal={() => { setShowAuthModal(true) }}
                userData={userData}
            />
            {showAddTask && <AddTaskForm addTask={addTask} />}
            <AuthModal
                open={showAuthModal}
                handleClose={() => setShowAuthModal(false)}
                setUserData={(data) => saveUserData(data)} />
            <Tasks onToggleReminder={toggleReminder} tasks={tasks} onDelete={deleteTask} />
        </Container>
    );
}

export default App;