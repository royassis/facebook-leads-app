
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function Site(props){

    const [leadData, setLeadData] = useState([]);
    const [accountIds, setAccountIds] = useState("");
    const [thisAccount, setThisAccount] = useState("");

    async function fetchLeads (pageAccessToken, adAccountId) {
        const response = await fetch(`http://localhost:5000/leads?access_token=${pageAccessToken}&account_id=${adAccountId}`);
        const leadData = await response.json();
        console.log(leadData);
        setLeadData(leadData);
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
                setLeadData([]);
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
      
    function setRow(i){
        leadData[i].className="b";
        console.log(leadData[i]);
        setLeadData(leadData);
    }


    return(
        
        <div> 
            <h1>My accounts</h1>
            <div>{accountIds}</div>
            {thisAccount && <h1>Account {thisAccount} pages</h1>}
            <Table striped bordered hover>
                <thead>
                    {leadData.length>0 && 
                        <tr>
                            {Object.keys(leadData[0]).filter(x => x != "className").map(
                                (colname, i) => <td key={i}>{colname}</td>
                            )}
                        </tr>}
                </thead>   
                <tbody>
                    {leadData.length>0 && leadData.map(
                        (lead, i)=>(
                            <tr 
                                className = {lead.className} 
                                onClick = {()=>setRow(i)} key={i}>
                                    {Object.values(lead).map((field, j)=><td key={j}>{field}</td>)}
                            </tr>)
                        )}
                </tbody>   
                
            </Table>
        </div>)
}