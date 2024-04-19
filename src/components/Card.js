import React, { useEffect, useRef } from 'react'
import { useDispatch, useCart } from './contextReducer';
import { useState } from 'react';

export default function Card(props) {
    let dispatch = useDispatch();
    let data = useCart();
    let priceRef = useRef()

    let options = props.options;
    let priceOptions = Object.keys(options[0]);
    // let foodItem = props.foodItems;
    let [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
                return;
            }
            else if (food.size !== size) {
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size
                });
                return;
            }
            return;
        }
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size
        });
        console.log(data);
        console.log(finalPrice);
        // console.log(options[0][size], qty);
    }
    let finalPrice = qty * parseInt(options[0][size]);

    useEffect(() => { setSize(priceRef.current.value) }, []);

    return (
        <div>
            <div className="card m-5" style={{ "width": "18rem" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="image" style={{ height: "200px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    {/* <p className="card-text">this is a some important text.</p> */}
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>

                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ${finalPrice}/-
                        </div>
                        <hr></hr>
                        <div className='btn btn-success justify-center mx-2' onClick={handleAddToCart}>Add to Cart</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
