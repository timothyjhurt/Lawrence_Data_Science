import React from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';
import './Experience2.css';
import { Button } from '../Button';
//import HeroSection from '../HeroSection';
import '../Cards.css';
import CardItem from '../CardItem';




export default function Products() {
  const myWizard = new window.tm.Wizard({
    // Define your classes
    classes: [
      {
        name: "Hand Up",
        title: "Record “Hand Up” examples.",
        description:
          "Add examples of what you want to trigger your “Hand Up” state. This can be anything you want, like holding up your hand or an object."
      },
      {
        name: "Hand Down",
        title: "Record “Hand Down” examples.",
        description:
          "Add examples of what you want to trigger your “Hand Down” state. For example, without your hand or object."
      }
    ],
    onLoad: () => {
      console.log("model has loaded");
    },
    // Callback for when the "inference camera" is running
    onPrediction: predictions => {
      predictions.sort((a, b) => (a.probability > b.probability ? -1 : 1));
      // predictionEl.innerHTML = predictions[0].className;
    },
    onSampleAdded: added => {
      console.log(added);
    },
    onTrain: () => console.log("train begins"),
    onTrainComplete: () => {
      console.log("train complete");
    }
  });

  function Cards() {
    return (
      <div className='cards' onClick= {myWizard.open}>
        <h1> </h1>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem 
                src ='images/tm2.gif'
                text='Try the Google Teachable Machine!'
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // function HeroSection() {
  //   return (
  //     <div className='hero-container'>
  //       <h1>CHOOSE YOUR EXPERIENCE</h1>
  //       {/* <div className='hero-btns'>
  //         <Button
  //           className='btns'
  //           buttonStyle='btn--outline'
  //           buttonSize='btn--large'
  //         >
  //           GET STARTED
  //         </Button>
  //         <Button
  //           className='btns'
  //           buttonStyle='btn--primary'
  //           buttonSize='btn--large'
  //           onClick={console.log('hey')}
  //         >
  //           WATCH TRAILER <i className='far fa-play-circle' />
  //         </Button> */
  //       /* </div> */}
        
        
  //     </div>
  //   );
  // }


  return (
  // <div>
  //    <teachable-button onClick={myWizard.open}> </teachable-button>
     <div>
       
      <Cards> 
      </Cards>
      <h2> The paragraph goes here </h2>
     </div>


 )

}
