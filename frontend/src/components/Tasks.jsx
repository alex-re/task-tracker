import { Grid } from '@material-ui/core'
import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggleReminder }) => {
    return (
        <Grid container direction='column' spacing={4} justify='center' alignItems='stretch'>
            {tasks.length === 0 && <p>No Task To Show!</p>}
            {tasks.map(
                (task) => (<Task onToggleReminder={onToggleReminder} key={task.id} task={task} onDelete={onDelete} />)
            )}
        </Grid>
    )
}

export default Tasks;