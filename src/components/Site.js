
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Site(props){

    const [htmlTable, setHtmlTable] = useState({});
    const [nRows, setNRows] = useState(0);
    const [accountIds, setAccountIds] = useState("");
    const [thisAccount, setThisAccount] = useState("");
    const [pages, setPages] = useState("");

    const getPages = function (adaccount){
        window.FB.api(`${adaccount}/promote_pages`, function(response) {
            response.data.map(x =>console.log(x.name, x.id))
            setPages(response.data.map(x =><button key = {x.id}>{x.name}</button>))
            })
    }

    useEffect(() => {
        async function foo () {
            const response = await fetch(`/get_data?access_token=${props.loginResponse.accessToken}`);
            const dict = await response.json();
            console.log(dict);
            let dictb = {};
            Object.keys(dict).forEach(key => dictb[key] = Object.values(dict[key]));
            let nRows = Math.max(...Object.keys(dictb).map(key => dictb[key].length))
            setHtmlTable(dictb);
            setNRows(nRows);
         }
         foo();
         
         window.FB.api('me/adaccounts', function(response) {
            setAccountIds(response.data.map((x , i)=> 
                <button key = {i} onClick = {() =>{getPages(x.id); setThisAccount(x.id)}}>
                    {x.id}
                </button>))
            })
         
      }, [props.loginResponse.accessToken]);
      
    const rows = new Array(nRows).fill(0).map((r, i) => Object.values(htmlTable).map(arr_ => <td>{arr_[i]}</td>))


    return(
        
        <div> 
            <h1>My accounts</h1>
            <div>{accountIds}</div>
            {thisAccount && <h1>Account {thisAccount} pages</h1>}
            <div>{pages}</div>
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