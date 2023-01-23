import React from 'react'
import { client } from '../shared/feathersjs'
import './verification.css'

const Verification = ({hrefParamString}) => {

    const Verify = () => {
        const values = {
            action: hrefParamString.split('?')[0],
            token: hrefParamString.split('?')[1].split('=')[1]
        }
        if (values.action === 'verifySignupLong' && values.token) { 
            console.log('verifySignupLong : ', values)
            client.service('authManagement').create({action: values.action, value: values.token}).then(verifiedData => {
                console.log('verifiedData 1', verifiedData)
            }).catch(err => {
                console.log('err 1: ', err)
            })
        } else if (values.action === 'passwordReset' && values.token) {
       
        }
    }

    React.useLayoutEffect(() => {
      Verify()
    }, [])

    return (
        <div id="notfound1">
            <div className="notfound1">
                <div className="notfound1-404">
                <h2>Sign up verification ......</h2>
                </div>
            </div>
        </div>
    )
}

export default Verification