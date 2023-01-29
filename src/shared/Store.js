import React, {useEffect} from 'react';

let initialState = {
    authenticated: false,
    user: null,
    accessToken: null,
    isAdmin: false,
    userlist: [],
    Profilelist: [],
    Servicelist: [],
    menulist: [],
    wslist: [],
    wsclist: [],
    userWsContents:[],
    user_menus: [],
    selected_menu: null,
    user_id: null,
    progression: false,
    alertProps: {open:false, severity:"success", message: ''}
}

export const Context = React.createContext();

const Store = ({children}) => {
    const [state, setstate] = React.useState(initialState)

    useEffect(() => {
      const globalContext = localStorage.getItem('globalContext')
      if (globalContext) {
        setstate(JSON.parse(globalContext))
      }
    }, [])

    useEffect(() => {
      localStorage.setItem('globalContext', JSON.stringify(state))
      console.log('Context STATE : ', state)
    }, [state])
    
  
    
    return (<Context.Provider value={[state, setstate]}> {children} </Context.Provider>)
}

export default Store;