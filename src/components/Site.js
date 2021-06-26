
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Site(props){
    console.log("response from login page: " + props.accessToken);

    const [htmlTable, setHtmlTable] = useState({});
    const [nRows, setNRows] = useState(0);

    useEffect(() => {
        async function foo () {
            const response = await fetch(`/get_data?access_token=${props.accessToken}`);
            const dict = await response.json();
            console.log(dict);
            let dictb = {};
            Object.keys(dict).forEach(key => dictb[key] = Object.values(dict[key]));
            let nRows = Math.max(...Object.keys(dictb).map(key => dictb[key].length))
            setHtmlTable(dictb);
            setNRows(nRows);
            
         }
         foo();
      }, []);
      
    const rows = new Array(nRows).fill(0).map((r, i) => Object.values(htmlTable).map(arr_ => <td>{arr_[i]}</td>))

    return(
        
        <div> 
            <h1>{props.accessToken}</h1> 
            <Table striped bordered hover>
                <thead>
                    <tr>{Object.keys(htmlTable).map((x, i) =>{return <td key = {i}>{x}</td>;})}</tr>
                </thead>   
                <tbody>
                    {rows.map(row => <tr>{row}</tr>)}
                </tbody>   
                
            </Table>
        </div>)
}