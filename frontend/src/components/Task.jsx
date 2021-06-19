import { Grid, Card, CardContent, CardActions, Button, Typography, Box } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import theme from '../theme'

const Task = ({ task, onDelete, onToggleReminder }) => {
    return (
        <Grid item>
            <Box marginX={4} borderLeft={task.reminder ? 10 : null} style={{ borderColor: theme.palette.info.main }} borderRadius={3}>
                <Card style={{ backgroundColor: '#eee' }}>
                    <CardContent>
                        <Typography variant='h5' style={{ display: 'inline' }}>
                            {task.text}
                        </Typography>
                        <Button onClick={() => onDelete(task.id)} variant="contained" color="secondary" startIcon={<DeleteIcon />} style={{ float: 'right' }}>
                            Delete
                    </Button>
                        <br /><br />
                        <Typography variant='body2'>
                            {task.day}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => onToggleReminder(task.id)} size="small" variant='contained' style={{ backgroundColor: theme.palette.success.main }}>
                            toggle reminder
                    </Button>
                    </CardActions>
                </Card>
            </Box>
        </Grid>
    )
}

export default Task