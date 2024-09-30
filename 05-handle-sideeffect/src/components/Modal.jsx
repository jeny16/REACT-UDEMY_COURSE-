import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children, open }) {
  const dialog = useRef(null);

  useEffect(() => {
    if (open && dialog.current) {
      dialog.current.showModal();
    } else if (dialog.current) {
      dialog.current.close(); 
    }
  }, [open]); 

  return createPortal(
    <dialog className="modal" ref={dialog}>
      { open ? children : null }
    </dialog>,
    document.getElementById('modal') 
  );
}

export default Modal;
