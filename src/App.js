import './App.css';
import {products as prodList} from './product';
import Card from '../src/component/card/card'
import { useState } from 'react';
function App() {
  const [isGrid,setIsGrid]=useState(true);
  const [cart,setCart]=useState([]);
  const [products,setProducts]=useState(prodList);
  const [defaultproducts]=useState(prodList);
  const [cartView,setCartView]=useState(false);
  const [cartTotal,setCartTotal]=useState(0);
 
  const addToTheCart=(id)=>{
    debugger;
    let list=[...products];

    let myTrolly=[...cart];
    list=list.map(ele=>{
      if(ele.prodId===id){
       let obj={...ele}
       delete obj.prodQuantity
       delete obj.hasSibling;
       delete obj.familyId;
        myTrolly.push(obj);
        ele.prodQuantity=ele.prodQuantity-1;
        setCartTotal(cartTotal+ele.prodPricing);
      }
      return ele;
    })
    console.log(myTrolly);
    setCart([...myTrolly])
    setProducts([...list])
  }

  const removeFromCart=(id)=>{
    let cartItem=[...cart];
    cartItem=cartItem.filter((ele)=>ele.prodId!==id)
    setCart([...cartItem])
  }
  return (
    <div className="App container-fluid">
      <div className='mb-5'>
        <h1 >Commerce site</h1>
        <input type='button' className='btn btn-primary float-right' value='Change View' onClick={()=>{setIsGrid(!isGrid)}}/>
     </div>
     <div className='mt-5 row '>
       <div className='col-2'>
            Cart Items:{cart&&cart.length} 
       </div>
       <div className='col-2'>
           <input type='button' className='btn btn-link'  
              value={cartView?'close cart':'See Cart'} 
              onClick={()=>{setCartView(!cartView)}} 
           />
       </div>
     </div>
     {
       cartView?<>
                  <div className="row mt-5">
                        {cart&&cart.map(ele=>{
                         return <Card 
                                   prodImage={ele.prodImage} 
                                   prodName={ele.prodName} 
                                   prodPricing={ele.prodPricing} 
                                   isGrid={false}
                                   prodId={ele.prodId}
                                   removeFromCart={removeFromCart}           
                                 >
                                 </Card>
                        })}
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                        Cart Total: Rs. {cartTotal} 
                    </div>
                       
                  </div>
                </>
          :
          <div className="row mt-5">
             {products.map(ele=>{
             
              return <Card 
                        prodImage={ele.prodImage} 
                        prodName={ele.prodName} 
                        prodQuantity={ele.prodQuantity} 
                        prodPricing={ele.prodPricing} 
                        hasSibling={ele.hasSibling} 
                        familyId={ele.familyId}
                        isGrid={isGrid}
                        prodId={ele.prodId}
                        addToTheCart={addToTheCart}
                      >
                       {ele.hasSibling&&defaultproducts.map(e=>
                          {
                            if(e.familyId===ele.familyId) {
                              return <button  className='btn'>{e.prodName}</button>
                            }
                          })}
                      </Card>
             })}
           </div>
     }    
     
    </div>
  );
}

export default App;
