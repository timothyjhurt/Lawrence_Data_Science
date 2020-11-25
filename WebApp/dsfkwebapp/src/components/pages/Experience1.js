import React from 'react';
import '../../App.css';
import {useSpring, useTransition, animated} from 'react-spring'


export default function Products() {
  const fade = useSpring({
    from: {opacity: 0, fontSize: '2rem', color: 'tomato'},
    to: {opacity: 1, color: 'green' , fontSize: '20em' },
    

  })   
    
    return <animated.div style={fade}>I will fade</animated.div>

}
