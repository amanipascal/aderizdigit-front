import React, {useContext} from 'react'
import { Button, CssBaseline, Grid, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system'
import UserSelect from './components/userSelect';
import ProfileList from './components/profileList';
import { Context } from '../../../shared/Store';
import { authenticated, client } from '../../../shared/feathersjs';
import MenuList from './components/menuList';
import ProfilSelect from './components/profilSelect';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const ProfilMenus = () => {

    const [state, setState] = useContext(Context)

    const [profils, setProfils] = React.useState([])

    const [profilId, setProfilId] = React.useState(null)

    const [profil, setProfil] = React.useState(null)


    const [Menus, setMenus] = React.useState([])

  
    const [menusChanges, setMenusChanges] = React.useState([])


    const [menusChanged, setMenusChanged] = React.useState(false)

    

    const handleChange = (event) => {
        setProfilId(event.target.value)
    };

    const getProfils = async () => {
        setState({...state, progression: true})
        if (authenticated()) {
        await client.service('profil').find({}).then(async resp => {
            setProfils([...resp.data ])
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
        getProfils();
        getMenus();
    }, [])


    React.useEffect(() => {
        setProfil(() => profils.find((item) => item._id == profilId) )
    }, [profilId])

   
    const thereIsChanges = () => {
        const newChanges = [...menusChanges];
        const ProfilMenus = (profil && profil.menus) ? [...profil.menus] : []
        return newChanges.sort().toString() != ProfilMenus.sort().toString() 
    }

    React.useEffect(() => {
        setMenusChanged(thereIsChanges())
    }, [menusChanges])
    

    const SubmitChanges = () => {
        setState({...state, progression: true})
        if (authenticated()) {
          client.service('profil').patch(profil._id, {menus: [...menusChanges]}).then(obj => {
            setProfils([...profils.map(u => u._id == obj._id ? obj : u)])
            setProfil(obj)
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
        <Grid container spacing={2} >
            <Grid item xs={12} md={6} >
                <Item>
                    <ProfilSelect profils={profils} handleChange={handleChange} />
                </Item>
                <div style={{width: '100%'}}>
                 <Button disabled={!menusChanged} variant="contained" onClick={() => SubmitChanges() } style={{textTransform: 'none'}}>Submit changes</Button>
                </div>
                <Item>
                    <MenuList  Cible={profil} menus={Menus} setMenusChanges={setMenusChanges} />
                </Item>
            </Grid>
           
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default ProfilMenus