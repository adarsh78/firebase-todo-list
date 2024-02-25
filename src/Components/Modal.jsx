import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const Modal = ( {isOpen, onClose, children}) => {
  return createPortal (
    <>
    {isOpen && 
    <>
    <div className='relative z-50 min-h-[100px] bg-white p-4 max-w-[300px] m-auto'>
   <div className="flex justify-end">
   <IoMdClose onClick={onClose} className="text-3xl cursor-pointer"/>
   </div>
   {children}
    </div>
    <div className='absolute top-0 h-screen w-screen backdrop-blur z-40'></div>
    </>
    }
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal