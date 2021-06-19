import { Button, Grid } from '@material-ui/core'

const Header = ({ toggleForm, showAddTask }) => {
    return (
        <Grid component='header' container direction='row' justify='space-between' alignItems='center'>
            <h1>React Task Tracker</h1>
            <Button variant="contained" size='medium' color={showAddTask ? 'secondary' : 'primary'} onClick={toggleForm}>
                {showAddTask ? "Close Form" : "Add Task"}
            </Button>
        </Grid >
    )
}

export default Header;