
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Styles from '../App.css'

export default function Site(props) {

    const [leadData, setLeadData] = useState([]);
    const [accountIds, setAccountIds] = useState("");
    const [thisAccount, setThisAccount] = useState("");

    async function fetchLeads(pageAccessToken, adAccountId) {
        const response = await fetch(`http://localhost:5000/leads?access_token=${pageAccessToken}&account_id=${adAccountId}`);
        const leadData_ = await response.json();
        console.log(leadData_);
        setLeadData(leadData_);
    }

    const getLeads = function (adAccountData) {
        window.FB.api(`${adAccountData.id}/promote_pages?fields=access_token`, function (response) {
            console.log("getLeads");
            console.log(response)
            if (response && response.data && response.data[0] && response.data[0].access_token) {
                response.data.map(x => console.log(x.name, x.id))
                console.log(response.data[0].access_token)
                fetchLeads(response.data[0].access_token, adAccountData.id)
            } else {
                setLeadData([]);
            }
        })
    };

    useEffect(() => {
        window.FB.api('me/adaccounts', function (response) {
            console.log(response);
            if (response.data) {
                setAccountIds(response.data.map((adAccountData, i) =>
                    <button
                        key={i}
                        onClick={() => { getLeads(adAccountData); setThisAccount(adAccountData.id) }}
                    >
                        {adAccountData.id}
                    </button>))
            }
        })

    }, [props.loginResponse.accessToken]);

    async function setRow(leadid, i) {
        let leadData_ = [...leadData];
        leadData_[i].marked = !leadData_[i].marked;
        setLeadData(leadData_);

        const res = await fetch(`http://localhost:5000/leads/${leadid}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(leadData_[i]),
        })
        
    }

    function filterFields(row) {
        const allowed = ['created', 'company_name', 'email', 'full_name', 'phone_number', 'platform', 'source', 'comments'];

        return Object.keys(row)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = row[key];
                return obj;
            }, {});

    }

    function formatTableData(data){
        Object.entries(data).forEach(()=>{})
    }

    return (

        <div>
            <h1>My accounts</h1>
            <div>{accountIds}</div>
            {thisAccount && <h1>Account {thisAccount} pages</h1>}
            <Table striped bordered hover>
                <thead>
                    {leadData.length > 0 &&
                        <tr>
                            {Object.keys(leadData[0]).filter(x => x != "marked").map(
                                (colname, i) => <td key={i}>{colname}</td>
                            )}
                        </tr>}
                </thead>
                <tbody>
                    {leadData.length > 0 && leadData.map(
                        (lead, i) => (
                            <tr className={lead.marked ? "PlainRow" : "MarkedRow"}
                                onClick={() => setRow(lead.id, i)} key={lead.id}>
                                {Object.values(filterFields(lead)).map((field, j) => <td key={j}>{field}</td>)}
                            </tr>)
                    )}
                </tbody>

            </Table>
        </div>)
}