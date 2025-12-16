import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Food_display from '../../components/food_display/Food_display';
import AppDownload from '../../components/AppDownload/AppDownload';

function Home() {
    const [category,setCategory]=useState("All");
    
  return (
    <>
    <Header></Header>
    <ExploreMenu category={category} setCategory={setCategory}></ExploreMenu>
    <Food_display category={category}></Food_display>
    <AppDownload></AppDownload>
    </>
  )
}

export default Home