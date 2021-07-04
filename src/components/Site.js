
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Site(props){

    const [htmlTable, setHtmlTable] = useState({});
    const [nRows, setNRows] = useState(0);
    const [accountIds, setAccountIds] = useState("");
    const [thisAccount, setThisAccount] = useState("");


    async function fetchLeads (pageAccessToken, adAccountId) {
        const response = await fetch(`http://localhost:5000/leads?access_token=${pageAccessToken}&account_id=${adAccountId}`);
        const dict = await response.json();
        console.log(dict);
        let dictb = {};
        Object.keys(dict).forEach(key => dictb[key] = Object.values(dict[key]));
        let nRows = Math.max(...Object.keys(dictb).map(key => dictb[key].length))
        setHtmlTable(dictb);
        setNRows(nRows);
     }

    const getPromotedPages = function (adAccountData){
        window.FB.api(`${adAccountData.id}/promote_pages?fields=access_token`, function(response) {
            console.log("getPromotedPages ");
            console.log(response)
            if (response && response.data && response.data[0] &&response.data[0].access_token){
                response.data.map(x =>console.log(x.name, x.id))
                console.log(response.data[0].access_token)
                fetchLeads(response.data[0].access_token, adAccountData.id)
            }else{
                setHtmlTable({});
            }
        })
    };

    useEffect(() => {
         window.FB.api('me/adaccounts', function(response) {
            console.log(response);
            if (response.data){
                setAccountIds(response.data.map((adAccountData , i)=> 
                <button 
                    key = {i} 
                    onClick = {() =>{getPromotedPages(adAccountData); setThisAccount(adAccountData.id)}}
                >
                    {adAccountData.id}
                </button>))   
            }
            })
         
      }, [props.loginResponse.accessToken]);
      
    const rows = new Array(nRows).fill(0).map((r, i) => Object.values(htmlTable).map(arr_ => <td>{arr_[i]}</td>))


    return(
        
        <div> 
            <h1>My accounts</h1>
            <div>{accountIds}</div>
            {thisAccount && <h1>Account {thisAccount} pages</h1>}
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