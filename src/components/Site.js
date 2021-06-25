
export default function Site(props){
    console.log("response from login page: " + props.accessToken);
    return(<h1>{props.accessToken}</h1>)
}