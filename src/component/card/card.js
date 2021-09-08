import React from 'react';
import './card.css'
const Card=(props)=>{

    return (
        <div className={'mb-2  col-'+(props.isGrid?'4':'12')}>
            <div className='Card m-2 row cardCustom'>
                <div className={' col-'+(props.isGrid?'12':'4')}>
                    <img src={props.prodImage} className='customImg' alt='phone'/>
                </div>
                <div className={' col-'+(props.isGrid?'12':'8 text-start')}>
               
                    <h5>{props.prodName}</h5>
                    <div> {props.prodQuantity>0?'only '+props.prodQuantity+' units left':'out of stock'}</div>
                    <div> prodPricing={props.prodPricing}</div>
                    {props.addToTheCart&&<input type='button' className='btn btn-link' value=' add to the cart ' onClick={()=>{props.addToTheCart(props.prodId)}} disabled={props.prodQuantity>0?false:true}/>}
                    {props.removeFromCart&&<input type='button' className='btn btn-link' value=' remove from the cart ' onClick={()=>{props.removeFromCart(props.prodId)}} />}
                    <div >
                        {props.children}
                    </div>
                    
                </div>
            </div>
        </div>
    )
} 

export default Card;