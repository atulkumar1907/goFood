import React from 'react'
import { useCart, useDispatch} from '../components/contextReducer';
import Table from "react-bootstrap/Table"
// import { trash } from ''

export default function Cart(props) {

    let data = useCart();
    let dispatch = useDispatch();

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-success'>The Cart is Empty</div>
            </div>
        )
    }

    const handleCheckOut = async()=>{
        let userEmail = localStorage.getItem("userEmail");
        let res = await fetch('https://localhost:5000/api/orderData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_data: data, 
                email: userEmail, 
                order_date: new Date().toDateString()
            })
        });
        if(res.status===200){
            dispatch({type: "DROP"})
        }
    }

    let totalPrice = data.reduce((total, food)=> total + food.price, 0);
    console.log(data);
    return (
        <div>
            <div className='containe m-auto mt-5 table-responsive-sm table-responsive-md text-success'>
                <Table className='table table-hover text-success'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                            {data.map((food, index) => {
                                <tr>
                                    <td className='text-primary' scope='row'>{index+1} </td>
                                    <td scope='row' key={index}>atul</td>
                                    <td  key={index}>{food.qty}</td>
                                    <td  key={index}>{food.size}</td>
                                    <td  key={index}>{food.price}</td>
                                    <td  key={index}><button type='button' className='btn p-0'><img src={"jdfjdj"} alt="delete" onClick={()=> {dispatch({type: "REMOVE", index: index})}}/></button></td>
                                </tr>
                            })}
                    </tbody>
                </Table>
                <div>
                    <h1 className='fs-2'>Total Price: {totalPrice}</h1>
                </div>
                <div>
                    <button className='btn bg-success mt-5' onClick={()=> handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    )
}

