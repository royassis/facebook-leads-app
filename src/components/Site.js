
import React, { useState, useEffect, createRef} from 'react';
import { Table } from 'react-bootstrap';

export default function Site(props) {

    const [leadData, setLeadData] = useState([]);
    const [accountIds, setAccountIds] = useState("");
    const [thisAccount, setThisAccount] = useState("");
    const [currentRow, setCurrentRow] = useState(-1);
    const [elRefs, setElRefs] = useState([createRef()]);    

    const keysToFilter = ["marked"];


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

    useEffect(()=>{setElRefs(__ => (
        Array(leadData.length).fill().map((_, i) => elRefs[i] || createRef())
      ));}, [leadData.length])

    function useOutsideAlerter() {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
             function handleClickOutside(event) {
                 console.log(elRefs.length);
                if (currentRow!== -1 && elRefs[currentRow] && !elRefs[currentRow].current.contains(event.target)) {
                    alert('You clicked outside of me!');
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [elRefs, currentRow]);
    }

    async function setRow(rowId) {
        let leadData_ = [...leadData];
        let newRow = leadData_.filter(row => row.id === rowId)[0]
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

    async function inputFieldOnChange(e, rowId) {
        setCurrentRow(rowId-1);
        e.preventDefault();

        let leadData_ = [...leadData];
        let newRow = leadData_.filter(row => row.id === rowId)[0]
   
        newRow.comments = e.target.value
        setLeadData(leadData_);

        console.log(newRow);

        await fetch(`http://localhost:5000/leads/${rowId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newRow),
        })

    }

    function formatRowEle(rowEle, eleIdx, rowId) {
        eleIdx = parseInt(eleIdx);
        if (rowEle[0] === "comments") {
            return <td key={eleIdx}>
                        <input
                            id ={rowId}
                            ref={elRefs[rowId-1]}
                            type="text"
                            value={rowEle[1]}
                            onChange={(e) => {inputFieldOnChange(e, rowId)}}>
                        </input>
                    </td>
        }
        else {
            return <td key={eleIdx}>{rowEle[1]}</td>
        }
    }

    function formatRow(row) {
        return <tr
                    key={row.id}
                    onDoubleClick={() => setRow(row.id)}
                    className={row.marked ? "PlainRow" : "MarkedRow"}
                >
                    {Object.entries(row).filter(rowEle => !keysToFilter.includes(rowEle[0])).map((rowEle, eleIdx) => formatRowEle(rowEle, eleIdx, row.id))}
                </tr>
    }

    function formatRows(rows) {
        return rows.map((row) => formatRow(row))
    }

    useOutsideAlerter();
    return (

        <div>
            <h1>My accounts</h1>
            <div>{accountIds}</div>
            {thisAccount && <h1>Account {thisAccount} pages</h1>}
            <Table striped bordered hover>
                <thead>
                    {leadData.length > 0 &&
                        <tr>
                            {Object.keys(leadData[0]).filter(x => !keysToFilter.includes(x)).map(
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