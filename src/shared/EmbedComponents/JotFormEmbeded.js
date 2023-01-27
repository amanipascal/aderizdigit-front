import { Button, Grid, IconButton, Tooltip } from '@mui/material';
import React, { Fragment, useState } from 'react'
import Iframe from 'react-iframe'
import { Loop } from '@mui/icons-material';
import TableViewIcon from '@mui/icons-material/TableView';
import ListAltIcon from '@mui/icons-material/ListAlt';
import JfDataTable from './JfDataTable'
import { Link } from 'react-router-dom';



const JotFormEmbeded = ({url, width, height}) => {

    const [showData, setShowData] = useState(true)
    
    // const [fileName, setFileName] = useState("")
    // const [hiddenCols] = useState(['_id', '__v', 'submit_id', 'submit_infos'])
    // const [Cols, setCols] = useState([])
    // const [gblFilterFields, setGblFilterFields] = useState([])


    const refresh = async () => {
        document.getElementById('iframeid').src += '';
    }

   

   

    // React.useEffect(() => {
    //     setGblFilterFields([...Object.keys(jtData[0]).filter(key => !hiddenCols.includes(key))])
    // }, [Cols])
    
    

    return  (
        <Fragment>
            <Grid container spacing={1} style={{height:'75vh', width:'80vw'}}>
                {
                    showData ? (
                    <Fragment>
                        <Grid item xs={12}>
                            <div style={{width: '100%'}}>
                                <Tooltip title="Aller au formulaire">
                                    <IconButton color="primary" size="large" onClick={() => setShowData(!showData)} aria-label="add to shopping cart">
                                        <ListAltIcon />
                                    </IconButton>
                                </Tooltip>
                                <Link to={'#'} onClick={() => setShowData(!showData)} >Aller au formulaire</Link>
                            </div>
                            <JfDataTable url={url} />
                                {/* <JfDataTable url={url} fileName={fileName} datasource={jtData} gblFilterFields={gblFilterFields} Cols={Cols} /> */}
                        </Grid>
                    </Fragment>): (
                    <Fragment>
                        <Grid item xs={1} justifyContent="center" alignContent="center" alignItems={"flex-start"}>
                            <Grid  container  direction="column"  justifyContent="center"
                                alignItems="flex-start" alignContent="center" 
                                >
                                <Tooltip title="Rafaichir le formulaire">
                                    <IconButton color="primary" size="large" onClick={() => refresh()} aria-label="add to shopping cart">
                                        <Loop />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Aller à la table de données">
                                    <IconButton color="primary" size="large" onClick={() => setShowData(!showData)} aria-label="add to shopping cart">
                                        <TableViewIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            
                        </Grid>

                        <Grid item xs={11}>
                            <Iframe allow="geolocation" 
                                src={url}
                                width={width}
                                height={height}
                                id="iframeid"
                                display="block"
                                position="relative"
                                styles={{
                                    border: 0, 
                                    display: 'block',
                                    width: '100%',
                                    boxShadow: '5px 5px 56px 0px rgba(0,0,0,0.25)'
                                }}
                            />
                        </Grid>
                    </Fragment>)
                }

                
            </Grid>
        </Fragment>
        )
}

export default JotFormEmbeded