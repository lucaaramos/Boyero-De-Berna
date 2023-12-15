import {useEffect,useRef} from 'react'
import "./style.css"
import ReactDOM from "react-dom"


export const Modal = ({children,onClose}) => {
  const menuRef = useRef(null)
  useEffect(()=>{
    let handle = (e)=>{
        if(!menuRef?.current?.contains(e?.target)){
            onClose(false)
        }
    }
    document.addEventListener("mousedown",handle)
    return()=>{
        document.removeEventListener("mousedown",handle)
    }
})

useEffect(() => {
  const element = document.getElementById('buto');
  if (element) {
    element.addEventListener('click', handleClick);
  }
  return () => {
    if (element) {
      element.removeEventListener('click', handleClick);
    }
  };
}, []);

const handleClick = () => {
  onClose()
};

  return (
    <div className='modal'>
        <div className='modal-contenido' ref={menuRef}>
            <button style={{cursor:"pointer"}} className='btn btn-danger' id='buto'>✖</button>
            {children} 
        </div>
    </div>
  )
}
const div = document.getElementById("modal-root") 
export default function ModalPortal({children,onClose}){
    return ReactDOM.createPortal(
        <Modal onClose={onClose}>
            {children}
        </Modal>,
        div
    )
  }