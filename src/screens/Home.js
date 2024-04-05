import React from 'react'
import Navbars from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card';
import Crousel from '../components/Crousel';

export default function Home() {
  return (
    <div>
      <div><Navbars /></div>
      <div>
      <Crousel/>
      </div>
      <div>
        <Card/>
      </div>
      <div><Footer /></div>
    </div>
  );
};
