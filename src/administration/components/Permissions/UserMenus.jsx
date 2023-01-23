import React, {useContext} from 'react'
import { Button, CssBaseline, Grid, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system'
import UserSelect from './components/userSelect';
import ProfileList from './components/profileList';
import { Context } from '../../../shared/Store';
import { authenticated, client } from '../../../shared/feathersjs';
import MenuList from './components/menuList';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const UserMenus = () => {

    const [state, setState] = useContext(Context)

    const [users, setUsers] = React.useState([])

    const [userId, setUserId] = React.useState(null)

    const [user, setUser] = React.useState(null)


    const [Menus, setMenus] = React.useState([])

  
    const [menusChanges, setMenusChanges] = React.useState([])


    const [menusChanged, setMenusChanged] = React.useState(false)

    

    const handleChange = (event) => {
        setUserId(event.target.value)
    };

    const getUsers = async () => {
        setState({...state, progression: true})
        if (authenticated()) {
        await client.service('users').find({}).then(async resp => {
            setUsers([...resp.data ])
            setState({...state, progression: false})
        }).catch(() => {
            setState({...state, progression: false})
        })
        } else {
            setState({...state, progression: false})
        }
    }

    const getMenus = async () => {
        setState({...state, progression: true})
        if (authenticated()) {
          await client.service('menu').find({}).then(async resp => {
            setMenus([...resp.data ])
            setState({...state, progression: false})
          }).catch(() => {
            setState({...state, progression: false})
          })
        } else {
            setState({...state, progression: false})
        }
    }

    React.useEffect(() => {
        getUsers();
        getMenus();
    }, [])


    React.useEffect(() => {
        setUser(() => users.find((item) => item._id == userId) )
    }, [userId])

   
    const thereIsChanges = () => {
        const newChanges = [...menusChanges];
        const UsersMenus = (user && user.menus) ? [...user.menus] : []
        return newChanges.sort().toString() != UsersMenus.sort().toString() 
    }

    React.useEffect(() => {
        setMenusChanged(thereIsChanges())
    }, [menusChanges])
    

    const SubmitChanges = () => {
        setState({...state, progression: true})
        if (authenticated()) {
          client.service('users').patch(user._id, {menus: [...menusChanges]}).then(obj => {
            setUsers([...users.map(u => u._id == obj._id ? obj : u)])
            setUser(obj)
            setState({...state, progression: false})
          }).catch(() => {
            setState({...state, progression: false})
          })
        } else {
            setState({...state, progression: false})
        }
    }

   
  return (
    <React.Fragment>
      <CssBaseline />
      <Container style={{width: '99% !important'}}>
        <h3>Affectation menus</h3>
        <Grid container spacing={2} >
            <Grid item xs={12} >
                <Item>
                    <UserSelect users={users} handleChange={handleChange} />
                </Item>
                <div style={{width: '100%'}}>
                 <Button disabled={!menusChanged} variant="contained" onClick={() => SubmitChanges() } style={{textTransform: 'none'}}>Submit changes</Button>
                </div>
                <Item>
                    <MenuList  Cible={user} menus={Menus} setMenusChanges={setMenusChanges} />
                </Item>
            </Grid>
           
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default UserMenus