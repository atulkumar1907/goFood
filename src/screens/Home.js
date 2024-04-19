import React, { useState, useEffect } from 'react'
import Navbars from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card';
import Crousel from '../components/Crousel';

export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

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
      <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-touch="false" style={{ objectFit: "cover !important" }}>
        <div className="carousel-inner">
          <div className='carousel-caption' style={{ 'zIndex': '10' }}>
            <div className="d-flex justify-content-center" role="search">
              <input className="form-control me-2 p-3 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=> setSearch(e.target.value)}/>
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
        <div className='container'>
          {
            foodCat.length > 0
              ?
              foodCat.map((data) => {
                return (<div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem.length > 0
                    ?
                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map(filterItem => {
                        return (
                          <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodItem = {filterItem}
                              options = {filterItem.options}
                            />
                          </div>
                        )
                      })
                    :
                    <div> No such data found</div>}
                </div>)
              })
              : ""
          }

        </div>
        <div><Footer /></div>
      </div>
      );
};
