import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import {useSpring, useTransition, animated} from 'react-spring'

function Cards() {
  const fade = useSpring({
    from: {opacity: 0, fontSize: '2rem'},
    to: {opacity: 1, fontSize: '3em' },


  })
  return (

    <animated.div style={fade} className='cards'>
      <h1>Choose your Experience</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/placeholder2.gif'
              text='Information about Experience 1'
              label='Fun'
              path='/Experience1'
            />
            <CardItem
              src='images/tm2.gif'
              text='Strike a pose, and the computer will learn from you!'
              path='/Experience2'
              label='More Fun'


            />

          </ul>


          {/* <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/sign-up'
            />
          </ul> */}
        </div>
      </div>
    </animated.div>
  );
}

export default Cards;
