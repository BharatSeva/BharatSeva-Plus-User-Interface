import "../App.css";

export default function Message( props ) {




    return (
        <div className="Message_Container">
            <div className="MessageBox">{props.message}</div>
        </div>
    )
}