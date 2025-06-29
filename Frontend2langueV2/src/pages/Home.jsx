import React from 'react'
import HeroSlider from '../components/HeroSlider'
import About from '../components/About'
import Topics from '../components/Topics'
import Partners from '../components/Partners'

const Home = () => {
  return (
    <div className="home-page">
      <HeroSlider />
      <About />
      <Topics />
      <Partners />
    </div>
  )
}

export default Home
