import { IoClose } from "react-icons/io5";

function Modal({show, onClose, children}) {
    return(
        <div style={{
            transform: show ? "translateX(0%)" : "translateX(-200%)",
          }} className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500">
            <div className="container mx-auto mt-5 max-w-2xl h-[110vh] rounded-3xl glass px-4 py-6">
              <button 
              onClick={() =>{
                onClose(false);
              }} 
              className="w-11 h-11 mb-4 font-bold rounded-full hover:bg-transparent hover:transition hover:duration-100 hover:scale-110  hover:border hover:border-white ">
               <IoClose className="w-10 h-10 mb-4 font-bold "/> 
              </button>
              {children}
            </div>
          </div>
      );
    
}

export default Modal;