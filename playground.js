rows = [
    {
      "id": 1,
      "created": "2021-06-21 05:35:14+00:00",
      "company_name": "Niloosoft Israel",
      "email": "libd@hoft.com",
      "full_name": "BD",
      "phone_number": "0505691",
      "platform": "fb",
      "source": "BITCOINE",
      "marked": true,
      "comments": ""
    },
    {
      "id": 2,
      "created": "2021-06-21 05:35:14+00:00",
      "company_name": "Niloosoft Israel",
      "email": "li@horift.com",
      "full_name": "Li",
      "phone_number": "0505691",
      "platform": "fb",
      "source": "BITCOINE",
      "marked": false,
      "comments": ""
    }
  ]


function setRowEle(rowEele){
  if (rowEele == rowEele){
    return rowEele
  }
}

function setRow(row){
  return Object.entries(row).filter(rowEele => rowEele[0]!== "marked").map(rowEele => setRowEle(rowEele))
}

function setRows(rows){
  return rows.map(row => setRow(row))
}


setRows(rows)