import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Cards from '../Cards';
import {useSpring, animated} from 'react-spring'
import Footer2 from '../Footer';
import './Home.css';

function Home() {
  const fade = useSpring({
    from: {opacity: 0, fontSize: '2rem' },
    to: {opacity: 1, fontSize: '3em' },
    

  }) 
    return (
<>
 <animated.div style = {fade}>

      <Cards/>
    
 </animated.div>
   
   <Footer2/>
   </>
    );
  }
  
  export default Home;