import React, { useContext } from 'react'
import TableauEmbed from '../../shared/EmbedComponents/TableauEmbed';
import MondayEmbeded from '../../shared/EmbedComponents/mondayEmbeded';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from '@mui/material';
import { Context } from '../../shared/Store';
import { useParams } from 'react-router-dom';
import { client } from '../../shared/feathersjs';
import noContent from '../../assets/images/digital/noContent.png'
import JotFormEmbeded from '../../shared/EmbedComponents/JotFormEmbeded';


// const NomEspace = "Tableau de bord du Directeur Général"

const Ws_default = () => {

  //const [state] = React.useContext(Context)
  const [state, setState] = useContext(Context)

  let { menu_id, user_id } = useParams();

  const [value, setValue] = React.useState('1');

  const [ApiBloks, setApiBloks] = React.useState([]);
  // const [wsData, setWsData] = React.useState({wsDesignation: "", wsDescription: ""});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const buildWsContent = async () => {
    if (menu_id) {
      const menu = await client.service('menu').get(menu_id)
      setState({...state, selected_menu: menu })
      // setWsData({wsDesignation: menu.wsdesignation, wsDescription: menu.wsdescription})
      const {wscontent} = menu
      if (wscontent && !!wscontent.length) {
        const user_wscontent = wscontent.find(wsc => wsc.user == user_id)
        if (user_wscontent && user_wscontent.wscompList && !!user_wscontent.wscompList.length) {
          const comp_orders = user_wscontent.comp_orders ? user_wscontent.comp_orders : []
          const compList = user_wscontent.wscompList ? user_wscontent.wscompList : []
          const compListWithOrders = compList.map(comp => {
            const orderObj = comp_orders.find(ob => ob.id === comp._id)
            return {
              ...comp,
              order: orderObj ? orderObj.order : 1000
            }
          })
          const SortedComps = compListWithOrders.sort((a, b) => a.order - b.order)
          setApiBloks([
                    ...SortedComps.map(wsc => {
                      return {
                        origin: wsc.origin_tool,
                        blockName: wsc.lib,
                        url: wsc.api,
                        height: wsc.height,
                        width: wsc.width,
                        lib: wsc.lib
                      }
                    })
                  ])
        } else {

          setApiBloks([])
        }
      } else {
        setApiBloks([])
      }
    }
  }

  React.useEffect(() => {
    buildWsContent()
    //console.log('menu_id : ', menu_id)
  }, [menu_id])

  return (
      <Box sx={{ width: '100%', typography: 'body1', paddingX: '20px' }}>
        {/* <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h6' > {wsData.wsDesignation} </Typography>
        </Box> */}
       
        {
            !!ApiBloks.length ? (
              <TabContext value={value} >
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example"  variant="scrollable">
                      {
                        ApiBloks.map((item, index )=> <Tab key={index} label={item.blockName} value={ (index + 1).toString() } />)
                      }
                    </TabList>
                  </Box>
                  {
                    ApiBloks.map((item, index) => (
                    <React.Fragment>
                      
                      <TabPanel key={index} value={(index + 1).toString()}>
                        {
                          item.origin == 'tableau' && <TableauEmbed url={item.url} width={ item.width ? item.width  : '100%'} height={ item.height ? item.height  : '70vh'} hideTabs={false} />
                        }
                        {
                          item.origin == 'monday' && <MondayEmbeded url={item.url} width={ item.width ? item.width  : '100%'} height={ item.height ? item.height  : '650'} />
                        }
                        {
                          item.origin == 'jotform' && <JotFormEmbeded url={item.url} width={ item.width ? item.width  : '100%'} height={ item.height ? item.height  : '90vh'} />
                        }
                      </TabPanel>
                    </React.Fragment>  
                    ))
                  }
              </TabContext>
            ) : (
              <Box sx={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
                <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={noContent} alt="noContent image" />
                </Box>
                <Typography variant='body1' > {'Pas de contenus métiers associé ...'} </Typography>
              </Box>
            )
          }
        
    </Box> 
  )
}

export default Ws_default