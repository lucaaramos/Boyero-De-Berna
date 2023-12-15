import React, { useEffect, useRef } from 'react'
import { IMAGES1 } from './imges'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faInstagram,faFacebook} from "@fortawesome/free-brands-svg-icons"
import {faChevronRight,faChevronLeft,faXmark} from "@fortawesome/free-solid-svg-icons"
import "./style.css"
export const Gallery = () => {
    const menuRef = useRef(null)

    const onClick = ()=>{
        return
    }
    useEffect(()=>{
        let contador
        let contain = document.querySelector('.slideshow')
        let overlay = document.querySelector('.overlay')
        let gallery_image = document.querySelectorAll('.gallery img')
        let img_slideshow = document.querySelector('.slideshow img')
        contain?.addEventListener('click', function(event){
            let atras = contain?.querySelector('.atras'),
            adelante = contain?.querySelector('.adelante'),
            img = contain?.querySelector('img'),
            tgt = event?.target
            if(tgt === atras){
                if(contador>0){
                    img.src = IMAGES1[contador-1].img
                    contador--
                }else{
                    img.src = IMAGES1[IMAGES1.length-1].img
                    contador = IMAGES1.length-1
                }
            }else if(tgt == adelante){
                if(contador<IMAGES1.length-1){
                    img.src = IMAGES1[contador+1].img
                    contador++
                }else{
                    img.src = IMAGES1[0].img
                    contador=0
                }
            }
        })
        Array.from(gallery_image).forEach(img=>{
            img?.addEventListener('click',event=>{
                const img_select = +event.target.dataset.imgShow
                img_slideshow.src = IMAGES1[img_select].img
                contador = img_select
                overlay.style.opacity = 1
                overlay.style.visibility = 'visible'
            })
        })
        return () =>{
        }
    },[onClick])
    const onClose = ()=>{
        let contain = document.querySelector('.slideshow')
        let img = contain?.querySelector('img')
        img.src=""
        let overlay = document.querySelector('.overlay')
                overlay.style.opacity = 0
                overlay.style.visibility = 'hidden'
        }
        useEffect(()=>{
            let handle = (e)=>{
                if(!menuRef?.current?.contains(e?.target)){
                    onClose()
                }
            }
            document.addEventListener("mousedown",handle)
            return()=>{
                document.removeEventListener("mousedown",handle)
            }
        })
    return (
    <div className='fontGallery'>
        <div className="overlay" >
            <div class="slideshow" ref={menuRef}>
                <div className="btn_close" onClick={onClose}><FontAwesomeIcon icon={faXmark}/></div>
                <div className="btn adelante">
                <FontAwesomeIcon className='mdi' icon={faChevronRight} />
                </div>
                <div className="btn atras">
                    <FontAwesomeIcon className='mdi' icon={faChevronLeft} />
                </div>
                <img src='' id='img_slideshow'/>
            </div>
        </div>
        <div className='font-gallery'>
            <h1 style={{display:"flex",width:"100%",alignItems:"center",justifyContent:'space-around',fontSize:40,color:"white"}}><span style={{backgroundColor:"#020",padding:10,borderRadius:10}}>Galería de fotos</span></h1>
        </div>
        <section className='gallery'>
            {
                IMAGES1.map((e,i)=><img onClick={onClick} src={e.img} data-img-show={i}/>)
            }
        </section>
    </div>
  )
}
