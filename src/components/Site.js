
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

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

    useEffect(() => {
        function getLeads(adAccountData) {
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

        await fetch(`http://localhost:5000/leads/${leadid}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(leadData_[i]),
        })
    }

    async function updateInputField(e, row_idx) {
        console.log(e.target.value);
        let leadData_ = [...leadData];
        leadData_[row_idx].comments = e.target.value
        setLeadData(leadData_);
    }    

    function formatRowEle(rowEele, ele_idx, row_idx) {
        var someval = rowEele[1];
        if (rowEele[0] === "comments") {
            return <td key={ele_idx}><input type="text" value ={someval} onChange ={(e, key)=>updateInputField(e, row_idx)}></input></td>
        } else {
            return <td key={ele_idx}>{rowEele[1]}</td>
        }

    }

    function formatRow(row, row_idx) {
        return <tr key={row_idx} onClick={() => setRow(row_idx, row.id)} className={row.marked ? "PlainRow" : "MarkedRow"}>
            {Object.entries(row).filter(rowEele => rowEele[0] !== "marked").map((rowEele, ele_idx) => formatRowEle(rowEele, ele_idx, row_idx))}
        </tr>
    }

    function formatRows(rows) {
        return rows.map((row, row_idx) => formatRow(row, row_idx))
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
                            {Object.keys(leadData[0]).filter(x => x !== "marked").map(
                                (colname, i) => <td key={i}>{colname}</td>
                            )}
                        </tr>}
                </thead>
                <tbody>
                    {leadData.length > 0 && formatRows(leadData)}
                </tbody>

            </Table>
        </div>)
}