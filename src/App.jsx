import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Seeker from './pages/Seeker/Seeker'

const App = () => {

  return (
    <>
      <Header logo={"https://jellysmack-rick-and-morty.netlify.app/img/rickmortylogo.1eb812f0.png"} LogoAlt={"Logo rick y Morty"} />
      <Seeker />
      <Footer />
    </>
  )
}

export default App;
