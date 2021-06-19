import { useState } from 'react'
import { Grid, Box, TextField, Checkbox, Button, FormLabel, FormControlLabel } from '@material-ui/core'
import theme from '../theme'

const AddTaskForm = ({ addTask = '' }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const [textError, setTextError] = useState(false)
    const [dayError, setDayError] = useState(false)

    const validayForm = () => {
        let textIsOk = true
        let dayIsOk = true
        if (text === '' || text === undefined || day === '' || day === undefined) {
            if (text === '' || text === undefined) {
                setTextError(true)
                textIsOk = false
            } else setTextError(false)
            if (day === '' || day === undefined) {
                setDayError(true)
                dayIsOk = false
            } else setDayError(false)
        }
        return textIsOk && dayIsOk
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        if (validayForm()) {
            addTask({ text, day, reminder })
            setText('')
            setDay('')
            setReminder(false)
            setTextError(false)
            setDayError(false)
        }
    }

    return (
        <Box marginX={2} marginY={3}>
            <form onSubmit={handelSubmit}>
                <FormLabel component="legend">Add a new task!</FormLabel>
                <br />
                <Grid container direction='column' spacing={1} justify='space-around' alignItems='stretch'>
                    <Grid item>
                        <TextField
                            value={text} onChange={(e) => setText(e.target.value)}
                            fullWidth label={textError ? 'Invalid Text' : 'Task Text'} variant="outlined"
                            error={textError}
                            helperText='Please enter task text' />
                    </Grid>
                    <Grid item><TextField
                        value={day}
                        onChange={(e) => { setDay(e.target.value) }}
                        label={dayError ? 'Invalid Day' : 'Day'}
                        type="datetime-local" // yyyy-MM-ddThh:mm
                        // defaultValue={`${new Day().getFullYear()}-${new Day().getMonth().toString().padStart(2, 0)}-${new Day().getDay().toString().padStart(2, 0)}`}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={dayError}
                        helperText='Please enter task day' />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            value='end'
                            label="Reminder"
                            labelPlacement="end"
                            control={
                                <Checkbox
                                    label='Reminder'
                                    onChange={(e) => setReminder(e.target.checked)}
                                    checked={reminder}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            }
                        />

                    </Grid>
                    <Grid item>
                        <Button type='submit' size='large' fullWidth variant='contained' style={{ backgroundColor: theme.palette.success.light }}>Add</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default AddTaskForm;