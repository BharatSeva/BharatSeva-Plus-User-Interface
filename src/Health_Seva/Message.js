import "../App.css";

export default function Message({ message }) {
    return (
        <div className="Message_Container">
            <div className="MessageBox">{message}</div>
        </div>
    )
} 