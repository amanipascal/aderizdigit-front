import React, { useContext } from 'react'
import { Button, CssBaseline, Grid, Paper } from '@mui/material'
import { Container } from '@mui/system'
import { styled } from '@mui/material/styles';
import UserSelect from './components/userSelect';
import { Context } from '../../../shared/Store';
import { authenticated, client } from '../../../shared/feathersjs';
import MenuSelect from './components/MenuSelect';
import WsCompList from './components/WsCompList';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const VisibComposMetier = () => {

    const [state, setState] = useContext(Context)

    const [users, setUsers] = React.useState([])
    const [userId, setUserId] = React.useState(null)
    const [user, setUser] = React.useState(null)

    const [menus, setMenus] = React.useState([])
    const [menuId, setMenuId] = React.useState(null)
    const [menu, setMenu] = React.useState(null)
   
    const [Compos, setCompos] = React.useState([])
    const [composChanges, setComposChanges] = React.useState([])
    const [composChanged, setComposChanged] = React.useState(false)

    const [WsContent, setWsContent] = React.useState(null)
    

    const handleChange = (event) => {
        setUserId(event.target.value)
    };

    React.useEffect(() => {
        setUser(() => users.find((item) => item._id == userId) )
    }, [userId])

    const menuHandleChange = (event) => {
        setMenuId(event.target.value)
    };

    React.useEffect(() => {
        setMenu(() => menus.find((item) => item._id == menuId) )
    }, [menuId])

    React.useEffect(() => {
        if (menu && user) {
            setState({...state, progression: true})
            client.service('wscontent').find({query: {
                menu: menu._id,
                user: user._id
            }}).then(resp => {
                setState({...state, progression: false})
                setWsContent(() => resp.data.length ? resp.data[0] : null)
            }).catch(() => setState({...state, progression: false}))
        } else {
            setWsContent(null)
        }
        
    }, [menu, user])

    React.useEffect(() => {
        console.log('WsContent : ', WsContent)
    }, [WsContent])


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

    const getCompos = async () => {
        setState({...state, progression: true})
        if (authenticated()) {
          await client.service('wscomps').find({}).then(async resp => {
            setCompos([...resp.data ])
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
        getCompos();
    }, [])

    const thereIsChanges = () => {
        if (menu && user) {
            const newChanges = [...composChanges];
            const wsContents = (WsContent && WsContent.wscomps) ? [...WsContent.wscomps] : []
            return newChanges.sort().toString() != wsContents.sort().toString()
        } else {
            return false
        }
    }

    React.useEffect(() => {
        setComposChanged(thereIsChanges())
    }, [composChanges])

    const SubmitChanges = () => {
        setState({...state, progression: true})
        if (authenticated()) {
            if (user && menu) {
                if (!WsContent) {
                    client.service('wscontent').create({menu: menu._id, user: user._id, wscomps:[...composChanges]}).then(wsc => {
                        setWsContent(wsc)
                        setState({...state, progression: false})
                    })
                } else {
                    client.service('wscontent').patch(WsContent._id, { wscomps:[...composChanges]}).then(wsc => {
                        setWsContent(wsc)
                        setState({...state, progression: false})
                    })
                }
            } else {
                setState({...state, progression: false})
            }
        } else {
            setState({...state, progression: false})
        }
    }


  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <h3>Visibilité des composants métiers</h3>
        <Grid container spacing={2} >
            <Grid container item xs={12} md={4} >
                <Grid item xs={12} >
                    <Item>
                        <UserSelect users={users} handleChange={handleChange} />
                    </Item>

                    <Item>
                        <MenuSelect menus={menus} menuHandleChange={menuHandleChange} />
                    </Item>
                    <div style={{width: '100%', marginTop: '10px'}}>
                        <Button disabled={!composChanged} variant="contained" fullWidth onClick={() => SubmitChanges() } style={{textTransform: 'none'}}>Submit changes</Button>
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <Item>
                    <WsCompList Cible={WsContent} compos={Compos} setComposChanges={setComposChanges} />   
                </Item>
            </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default VisibComposMetier