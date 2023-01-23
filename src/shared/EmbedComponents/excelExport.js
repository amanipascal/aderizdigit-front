import React from 'react'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { Button } from 'primereact/button';

function ExcelExport({excelData, fileName}) {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const workbook = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName, fileExtension);
    }

  return (
    <Button type="button" icon="pi pi-file-excel" onClick={exportToExcel}  className="p-button-success mr-2" data-pr-tooltip="XLS" />
  )
}

export default ExcelExport