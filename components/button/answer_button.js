export default function AnswerButton(props) {
    return (
        <button onClick={props.onClick}>
            {props.label}
        </button>
    );
}