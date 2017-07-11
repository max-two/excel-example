var excel = require('exceljs');
var _ = require('lodash');

var workbook = new excel.Workbook();
var sheet = workbook.addWorksheet('test');
var filename = 'exceljs.xlsx';

// Hardcoded example data
var data = [
    {
        pid: 'P1002650',
        mod: 'M0100',
        success: true
    },
    {
        pid: 'P1002650',
        mod: 'M0101',
        success: false
    },
    {
        pid: 'P1002650',
        mod: 'M0111',
        success: false
    },
    {
        pid: 'P1002677',
        mod: 'M0100',
        success: true
    },
    {
        pid: 'P1005600',
        mod: 'M0111',
        success: false
    }
]

// Column headers
sheet.columns = [
    {
        header: 'Product Id',
        key: 'pid',
        width: '25',
        style: {
            alignment: {
                vertical: 'middle',
                horizontal: 'center'
            }
        }
    },
    {
        header: 'ModCode',
        key: 'mod',
        width: '25',
        style: {
            alignment: {
                vertical: 'middle',
                horizontal: 'center'
            }
        }
    },
    {
        header: 'Pass/Fail',
        key: 'success',
        width: '25',
        style: {
            alignment: {
                vertical: 'middle',
                horizontal: 'center'
            }
        }
    }
]

// Access header row and change styling
sheet.getRow(1).eachCell(function(cell) {
    cell.font = {
        bold: true
    };
});

// Access and add styling to a specific cell
sheet.getCell('C1').font = {
    color: { argb: 'FFFF0000'}
};

// Add data programmatically
_.forEach(data, function(data) {
    sheet.addRow({
        pid: data.pid,
        mod: data.mod,
        success: data.success
    });
});

// Adding seporator for readability
sheet.addRow({pid: '------------------', mod: '------------------', success: '------------------'});

// Add data by array
sheet.addRows(data);


// Write file to disk
workbook.xlsx.writeFile(filename)
    .then(function() {
        console.log('Workbook created');
        console.log('Number of columns: ' + sheet.actualColumnCount);
        console.log('Number of rows: ' + sheet.actualRowCount);
    });