import { Tooltip, Typography } from '@mui/material';
import React, { Fragment, useContext } from 'react'
import {Row, Column} from 'simple-flexbox'
import '../../assets/css/app.css'
import { Context } from '../../shared/Store';
import Account from './Account';


const Main_header = ({handleCollapseChange}) => {

    const [userService, setUserService] = React.useState(null)
    const [state] = useContext(Context)

    React.useEffect(() => {
        setUserService(localStorage.getItem('user_service'))
    }, [])

    React.useEffect(() => {
        console.log('state selected_menu === : ', state.selected_menu)
    }, [state])
    

  return (
    <header  className="navbar-header header-bg" >
        <Row vertical='start'  style={{width:'100%'}}>
            <Column vertical='center' horizontal='start' style={{width:'5%'}}>
                <button onClick={handleCollapseChange} type="button" className="btn btn-md px-3 font-size-15 header-item waves-effect" id="vertical-menu-btn">
                    <i className="fa fa-fw fa-bars" style={{color: '#fff200'}}></i>
                </button>
            </Column>
            
            <Column vertical='center' horizontal='center' style={{width:'95%'}}>
                <Row vertical='center' horizontal='flex-end' style={{width:'100%'}}>
                    <Column vertical='center' horizontal='flex-start' style={{width:'30%'}}>
                        <Typography variant="h6" style={{color: 'white', marginTop: "5px"}} gutterBottom>
                          
                            {
                              userService && 
                              (
                                <Fragment>
                                {
                                    userService.length <= 30 ? userService
                                    : (
                                        <Tooltip title={userService} placement="right" arrow> 
                                           <span> {`${userService.substring(0,30)}...`} </span> 
                                        </Tooltip> 
                                    )
                                }
                                </Fragment>
                                )
                            }
                        </Typography>
                    </Column>
                    <Column vertical='center' horizontal='start' style={{width:'60%'}}>
                        <Typography variant="h6" style={{color: 'white'}} gutterBottom>
                            {
                              state.selected_menu && state.selected_menu.wsdesignation
                            }
                        </Typography>
                    </Column>
                    
                    <Column vertical='center' horizontal='flex-end' style={{width:'5%'}}>
                        <Account/>
                    </Column>
                    <Column vertical='center' horizontal='flex-end' style={{width:'5%'}}>
                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item noti-icon right-bar-toggle waves-effect">
                                <i className="bx bx-cog bx-spin" style={{color: '#fff200', fontSize: '20px'}}></i>
                            </button>
                        </div>
                    </Column>
                </Row>

            </Column>
        </Row>
    </header>
  )
}

export default Main_header