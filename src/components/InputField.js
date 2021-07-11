export default function InputField({eleIdx, rowEle, rowId, wrapperRef, inputFieldOnChange, leadData}) {
    return (
            <td key={eleIdx}>
                <input 
                    ref={wrapperRef}
                    type="text"
                    value={rowEle[1]}
                    onChange={(e)=>inputFieldOnChange(e, rowId, leadData)}
                    onClick = {console.log(wrapperRef)}>
                </input>
            </td>)
}