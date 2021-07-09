
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

    async function setRow(rowId) {
        let leadData_ = [...leadData];
        let newRow = leadData_.filter(row=> row.id === rowId)[0]
        newRow.marked = !newRow.marked;
        setLeadData(leadData_);

        await fetch(`http://localhost:5000/leads/${rowId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newRow),
        })
    }

    async function updateInputField(e, rowId) {
        let leadData_ = [...leadData];
        let newRow = leadData_.filter(row=> row.id === rowId)[0]
        newRow.comments = e.target.value
        setLeadData(leadData_);

        await fetch(`http://localhost:5000/leads/${rowId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newRow),
        })
    }    

    function formatRowEle(rowEle, eleIdx, rowId) {
        if (rowEle[0] === "comments") {
            return <td key={rowEle[0]}><input type="text" value ={rowEle[1]} onChange ={(e, key)=>updateInputField(e, rowId)}></input></td>
        } 
        else {
            return <td key={eleIdx}>{rowEle[1]}</td>
        }
    }

    function formatRow(row) {
        return <tr key={row.id} onClick={() => setRow(row.id)} className={row.marked ? "PlainRow" : "MarkedRow"}>
            {Object.entries(row).filter(rowEle => rowEle[0] !== "marked").map((rowEle, eleIdx) => formatRowEle(rowEle, eleIdx, row.id))}
        </tr>
    }

    function formatRows(rows) {
        return rows.map((row) => formatRow(row))
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