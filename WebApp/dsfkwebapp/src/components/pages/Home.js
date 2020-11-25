import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Cards from '../Cards';
import {useSpring, animated} from 'react-spring'
import Footer2 from '../Footer';
import './Home.css';

function Home() {
  const props = useSpring({opacity: 1, from: {opacity: 0}})
    return (

 <>
      <Cards/>
      <Footer2/>
 </>
   

    );
  }
  
  export default Home;