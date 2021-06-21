import { Button, Grid } from '@material-ui/core'
import { orange, lightGreen } from '@material-ui/core/colors'

const Header = ({ toggleForm, showAddTask, openAuthModal, userData }) => {
    console.log(userData.username)
    return (
        <Grid component='header' container direction='row' justify='space-between' alignItems='center'>
            <h1>React Task Tracker</h1>
            <h6>Hi {userData.username ? userData.username : 'Anonymous'}</h6>
            <Button variant="contained" size='medium' color={showAddTask ? 'secondary' : 'primary'} onClick={toggleForm}>
                {showAddTask ? "Close Form" : "Add Task"}
            </Button>
            {userData.username === undefined
                ? <Button variant='contained' onClick={openAuthModal} style={{ backgroundColor: orange[900], color: lightGreen[100] }}> Login </Button>
                : <Button variant='contained' style={{ backgroundColor: orange[900], color: lightGreen[100] }}> Logout </Button>
            }
        </Grid >
    )
}

export default Header;