import { useEffect, useState } from "react";
import Progressbar from "./Progressbar";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const TIMER = 3000;

  useEffect(() => {
    console.log("TIME OUT");

    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    return () => {
      console.log("cleaning up timer");
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
        <Progressbar />
      </div>
    </div>
  );
}
