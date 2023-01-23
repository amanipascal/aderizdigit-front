import React, { Fragment, useRef, useState } from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"               
import "primeicons/primeicons.css"                             
import { DataTable } from 'primereact/datatable';
import { Tooltip } from 'primereact/tooltip';
import { Column } from 'primereact/column';
import { IconButton } from '@mui/material';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import ExcelExport from './excelExport'
import { client } from '../feathersjs';

function JfDataTable({ url }) {
    const dt = useRef(null);
    
    const [jtData, setJtData] = useState([])
    const [fileName, setFileName] = useState("")
    const [hiddenCols] = useState(['_id', 'createdAt', 'updatedAt', '__v', 'submit_id', 'submit_infos'])
    const [Cols, setCols] = useState([])
    const [gblFilterFields, setGblFilterFields] = useState([])

    const exportColumns = Cols && Cols.map(col => ({ title: col.header, dataKey: col.field }));

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters1] = useState(null);

    React.useEffect(() => {
        if (url) {
            client.service('jtforms').find({query: {url}}).then(jfrep => {
                if (!!jfrep.data.length) {
                    const srv = jfrep.data[0]['crud_service']
                    setFileName(srv)
                    client.service(srv).find().then(srvData => {
                        setJtData([
                            ...srvData.data.map(({_id, createdAt, updatedAt, __v, submit_id, submit_infos, PositionGps, Localisation, ...item}) => item)
                        ])
                    })
                }
            })
        }
    //return () => {}
    }, [url])

    // .map(item => {
    //     const allowedkeys = Object.keys(item).filter(k => !hiddenCols.includes(k));
    //     allowedkeys.map(key => {})
    // })

    React.useEffect(() => {
        if (!!jtData.length) {
            const allowedFields = [...Object.keys(jtData[0]).filter(key => !hiddenCols.includes(key))]
            setGblFilterFields(allowedFields)
            setCols([...allowedFields.map(item => {
                return { field: item, header: item }
             })])
            //  console.log('jotform data: ', jtData)
        }
    }, [jtData])

    // React.useEffect(() => {
    //     console.log('Cols: ', Cols)
    //     console.log('gblFilterFields: ', gblFilterFields)
        
    // }, [Cols])
    




    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            // 'code': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            // 'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        });
        setGlobalFilterValue1('');
    }
    
    React.useEffect(() => {
        initFilters1();
    }, [])

    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, jtData);
                doc.save(`${fileName}.pdf`);
            })
        })
    }


    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <div className="flex align-items-center export-buttons">
                   <ExcelExport excelData={jtData} fileName={fileName} />
                    <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
                </div>
                <h3>{fileName}</h3>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                    {
                        globalFilterValue1 && (
                            <IconButton color="primary" aria-label="filter off" component="label" onClick={initFilters1} >
                                <FilterAltOffIcon />
                            </IconButton>
                        )
                    }
                    
                </span>
            </div>
        )
    }


    const header1 = renderHeader1();

  return (
    <Fragment>
        <div className="card">
            <Tooltip target=".export-buttons>button" position="bottom" />
            <DataTable 
             ref={dt}
             value={jtData}
             stripedRows
             paginator 
             size="small" responsiveLayout="scroll"
             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,20]}
             paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
             dataKey="id" 
             filters={filters1}
             header={header1}
             globalFilterFields={[...gblFilterFields]} 
             emptyMessage="Aucune donnée trouvée."
             scrollable
             scrollHeight="400px"
             >
                {
                    Cols && Cols.map(
                        (col, index) => <Column key={index} field={col.field} header={col.header} filterField={col.field} sortable filter filterPlaceholder={`Search by ${col.field}`} />
                    )
                }
            </DataTable>
        </div>
    </Fragment>
  )
}

export default JfDataTable


    // const [data] = useState([
    //     {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
    //     {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
    //     {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
    //     {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
    //     {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
    //     {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
    //     {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
    //     {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
    //     {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
    //     {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3}
    // ]);
    
    // const cols = [
    //     { field: 'code', header: 'Code' },
    //     { field: 'name', header: 'Name' },
    //     { field: 'category', header: 'Category' },
    //     { field: 'quantity', header: 'Quantity' }
    // ];
