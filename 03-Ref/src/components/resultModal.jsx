import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal({ timeRemaining, targetTime, onReset }, ref) {

    const dialog = useRef();
    const userLost = timeRemaining <= 0;
    const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
        };
    });

    return (
        <dialog ref={dialog} className="result-modal">
            {userLost && <h2>you Lost</h2>}
            {!userLost && <h2>your score: {score}</h2>}
            <p>
                The Target Time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                you stopped timer with {' '}
                <strong>{formattedRemainingTime} seconds left</strong>{" "}
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button type="submit">close</button>
            </form>
        </dialog>
    );
});

export default ResultModal;
