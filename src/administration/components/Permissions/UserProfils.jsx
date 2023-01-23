import React, {useContext} from 'react'
import { Button, CssBaseline, Grid, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system'
import UserSelect from './components/userSelect';
import ProfileList from './components/profileList';
import { Context } from '../../../shared/Store';
import { authenticated, client } from '../../../shared/feathersjs';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const UserProfils = () => {

    const [state, setState] = useContext(Context)

    const [users, setUsers] = React.useState([])

    const [userId, setUserId] = React.useState(null)

    const [user, setUser] = React.useState(null)

    const [Profils, setProfils] = React.useState([])

    const [profilsChanges, setProfilsChanges] = React.useState([])

    const [profilsChanged, setProfilsChanged] = React.useState(false)

    

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

    const getProfils = async () => {
        setState({...state, progression: true})
        if (authenticated()) {
          await client.service('profil').find({}).then(async resp => {
            setProfils([...resp.data.map(profil => {return {_id: profil._id, name: profil.name}}) ])
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
        getProfils();
    }, [])


    React.useEffect(() => {
        setUser(() => users.find((item) => item._id == userId) )
    }, [userId])

   
    const thereIsChanges = () => {
        const newChanges = [...profilsChanges];
        const UsersProfils = (user && user.profils) ? [...user.profils] : []
        return newChanges.sort().toString() != UsersProfils.sort().toString() 
    }

    React.useEffect(() => {
        // const profs = (user && user.profils) ? user.profils : []
        setProfilsChanged(thereIsChanges())
    }, [profilsChanges])
    

    const SubmitChanges = () => {
        setState({...state, progression: true})
        if (authenticated()) {
          client.service('users').patch(user._id, {profils: [...profilsChanges]}).then(obj => {
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
      {/* <CssBaseline /> */}
      <Container style={{width: '99% !important'}}>
        <h3>Affectation profils</h3>
        <Grid container spacing={2} >
            <Grid item xs={12} >
                <Item>
                    <UserSelect users={users} handleChange={handleChange} />
                </Item>
                <div style={{width: '100%'}}>
                 <Button disabled={!profilsChanged} variant="contained" onClick={() => SubmitChanges() } style={{textTransform: 'none'}}>Submit changes</Button>
                </div>
                <Item>
                    <ProfileList  Cible={user} profils={Profils} setProfilsChanges={setProfilsChanges} />
                </Item>
            </Grid>
           
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default UserProfils