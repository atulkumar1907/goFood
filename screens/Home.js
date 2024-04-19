import React, { useState, useEffect } from 'react'
import Navbars from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card';
import Crousel from '../components/Crousel';

export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/foodData', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    // console.log(response[0], response[1]);

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <div><Navbars /></div>
      <div><Crousel /></div>
      <div className='container'>
        {
          foodCat.length > 0
          ? 
          foodCat.map((data)=> {
            return <div>{data.CategoryName}</div>
          })
          : ""
        }
        <Card />
      </div>
      <div><Footer /></div>
    </div>
  );
};
