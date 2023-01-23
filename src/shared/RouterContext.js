import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { client } from './feathersjs';

const RouterContext = React.createContext();

const RouterProvider = ({children}) => {
  const location = useLocation()
  let navigate = useNavigate();
  const [route, setRoute] = React.useState({ //--> it can be replaced with useRef or localStorage
    to: location.pathname,
    from: location.pathname
  });

  useEffect(()=> {
    setRoute((prev)=> ({to: location.pathname, from: prev.to}) )
  }, [location]);

  const RouteControl = async () => {
    const authData = await client.get('authentication');
    // console.log('authData : ', authData)
    const racineTo = route.to.split('/')[1]
    const racineForm = route.from.split('/')[1]
    if (racineTo !== racineForm) {
      if (racineTo == 'authenticate') {
          // navigate(0)
      } else {
        if (authData) {
          // navigate(route.from)
          // console.log('route.from : ', route.from)
        }
      } 
   }
  
  }

  useEffect(()=> {
    RouteControl()
    // console.log('route : ', route)
    // const racineTo = route.to.split('/')[1]
    // const racineForm = route.from.split('/')[1]
    //  if (racineTo !== racineForm) {
    //     if (racineTo == 'authenticate') {
    //         navigate(0)
    //     } else {
          
    //         // navigate(racineForm, {replace: true})
    //     } 
    //  }
  }, [route]);

  
  return <RouterContext.Provider value={route}> {children} </RouterContext.Provider>
}

export default RouterProvider;