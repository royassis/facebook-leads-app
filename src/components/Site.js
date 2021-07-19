
import React, { useState, useEffect, createRef} from'react';
import { Table } from 'react-bootstrap';

export default function Site(props) {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [leadData, setLeadData] = useState([]);
    const [accountIds, setAccountIds] = useState("");
    const [thisAccount, setThisAccount] = useState("");
    const [currentRow, setCurrentRow] = useState(-1);
    const [elRefs, setElRefs] = useState([createRef()]);
    const [refreshFlag, setRefreshFlag] = useState(0);     

    const keysToFilter = ["marked"];

    useEffect(() => {
        async function fetchLeads() {
            const userToken = props.loginResponse.authResponse.accessToken
            console.log(userToken);
            setRefreshFlag(1);
            // await fetch(`/me/leads/refresh?access_token=${userToken}`, {method: 'POST'});
            setRefreshFlag(0)
            const response = await fetch(`/me/leads?access_token=${userToken}`);
            const leadData_ = await response.json();
            console.log(leadData_);
            setLeadData(leadData_);

            setElRefs(__ => (
                Array(leadData_.length).fill().map((_, i) => elRefs[i] || createRef())
            )) 
        }
          

        window.FB.api('me/adaccounts', function (response) {
            console.log(response);
            if (response.data) {
                setAccountIds(response.data.map((adAccountData, i) =>
                <li className="list-group-item" key={i}>
                    <button 
                        className ="btn btn-primary"
                        onClick={() => { fetchLeads(); setThisAccount(adAccountData.id) }}
                    >
                        {adAccountData.id}
                    </button>
                </li>))
            }
        })
    }, [elRefs, backendUrl, refreshFlag, props.loginResponse.authResponse.accessToken]);


    function useOutsideAlerter() {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
             async function handleClickOutside(event) {
                 console.log(currentRow);
                if (currentRow!== -1 && elRefs[currentRow] && !elRefs[currentRow].current.contains(event.target)) {
                    console.log("data saved");

                    let newRow = leadData.filter((row,i) => i === currentRow)[0]
                    await fetch(`/me/leads/${newRow.lead_id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(newRow),
                    })
                    
                    setCurrentRow(-1);
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        });
    }

    async function setRow(rowId) {
        let leadData_ = [...leadData];
        let newRow = leadData_.filter(row => row.lead_id === rowId)[0]
        newRow.marked = !newRow.marked;
        console.log(newRow);
        setLeadData(leadData_);

        await fetch(`/me/leads/${rowId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newRow),
        })
    }

    async function inputFieldOnChange(e, eleIdx, lead_id) {
        e.preventDefault();

        setCurrentRow(eleIdx);
        
        let leadData_ = [...leadData];
        let newRow = leadData_.filter(row => row.lead_id === lead_id)[0];
   
        newRow.comments = e.target.value;
        
        setLeadData(leadData_);
    }

    function formatRowEle(rowEle,eleId, rowId, leadId) {
        eleId = parseInt(eleId);
        var jsxEle = null;
        if (rowEle[0] === "comments") {
            jsxEle= <td key={leadId+eleId}>
                        <input  
                            key = {leadId+eleId+1}
                            ref={elRefs[rowId]}
                            type="text"
                            value={rowEle[1]}
                            onChange={(e) => inputFieldOnChange(e, eleId, leadId)}
                            >
                        </input>
                    </td>
        }
        else if (rowEle[0] === "phone_number") {
            jsxEle= <td  key={leadId+eleId} className = {"no_selection"}>
                        <a href={`tel:+${rowEle[1]}`}>
                            {rowEle[1]}
                        </a>
                    </td>
        }
        else {
            jsxEle= <td  key={eleId+eleId} className = {"no_selection"}>{rowEle[1]}</td>
        }
        return jsxEle
    }

    function formatRow(row, rowIdx) {
        return <tr
                    key={row.lead_id}
                    onDoubleClick={() => setRow(row.lead_id)}
                    className={row.marked ? "MarkedRow" : "PlainRow"}
                >
                    {Object.entries(row).filter((rowEle) => !keysToFilter.includes(rowEle[0])).map((rowEle, eleId) => formatRowEle(rowEle, eleId, rowIdx, row.lead_id))}
                </tr>
    }

    function formatRows(rows) {
        return rows.map((row, i) => formatRow(row, i))
    }

    useOutsideAlerter();
    return (

        <div className = "Site">
            <h1>My accounts</h1>
            <div><ul className="list-group">{accountIds}</ul></div>
            {thisAccount && <h1>Account {thisAccount} pages</h1>}
            <Table striped bordered hover>
                <thead>
                    {leadData.length > 0 &&
                        <tr>
                            {Object.keys(leadData[0]).filter(x => !keysToFilter.includes(x)).map(
                                (colname) => <td key={colname}>{colname}</td>
                            )}
                        </tr>}
                </thead>
                <tbody>
                    {refreshFlag ===0 && leadData.length > 0 && formatRows(leadData)}
                </tbody>
            </Table>
            <p>{refreshFlag === 1 && "refreshing table ..."}</p>
        </div>)
}