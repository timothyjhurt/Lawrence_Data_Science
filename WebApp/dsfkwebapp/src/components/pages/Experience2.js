import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';
import './Experience2.css';
import { Button } from '../Button';
//import HeroSection from '../HeroSection';
import '../Cards.css';
import CardItem from '../CardItem';
import Footer2 from '../Footer';
import { Link } from 'react-router-dom';



export default function Products() {
  const myWizard = new window.tm.Wizard({
    // Define your classes
    classes: [
      {
        name: "Hand Up",
        title: "Raise your Hand",
        description1:
          "Raise one of your hands and click the “Record 2 Seconds” button.",
        description2:
          "Wave your raised hand around until the recording has finished.",
        description3:
          "Then, press “Next”"
      },
      {
        name: "Hand Down",
        title: "Put your Hand down",
        description1:
          "Put your hands down and click the “Record 2 Seconds” button.",
        description2:
          "Move around until the recording has finished (without raising your hand).",
        description3:
          "Then, press “Next”"
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
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
    return (
      <>
      <div className='cards'>
        <div className='cards__container'>
        <p>Have you ever wanted to train your computer? Now's your chance!<br/>Click below to "Try Google's Teachable Machine" so that you can teach your computer to recognize when you have raised your hand or put your hand down.</p>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                label="Try me!"
                src ='images/tm2.gif'
                text="Try Google's Teachable Machine!"
                path='/Experience2'
                onClick={myWizard.open}
              />
            </ul>
          </div>
         <p>This type of experience is called "Machine Learning." If you want to learn more about machine learning, here are some other resources you can go explore: </p> <br/>
          <ul> 
            <li>  {button && <Button buttonStyle='btn--outline'> <a href="https://teachablemachine.withgoogle.com/">Teachable Machine</a>  </Button>} </li> <br/>
            <li> {button && <Button buttonStyle='btn--outline'> AI Experiments </Button>} </li> <br/>
            <li> {button && <Button buttonStyle='btn--outline'>Draw with the Help of AI</Button>} </li> <br/>
            <li> {button && <Button buttonStyle='btn--outline'>Play Pictionary with AI</Button>} </li>
            {/* <li><a href="https://teachablemachine.withgoogle.com/">Teachable Machine</a></li>
            <li><a href="https://experiments.withgoogle.com/collection/ai">AI Experiments</a></li>
            <li><a href="http://nvidia-research-mingyuliu.com/gaugan/">Draw with the Help of AI</a></li>
            <li><a href="https://quickdraw.withgoogle.com/">Play Pictionary with AI</a></li> */}
          </ul>
        </div>

      </div>

      <Footer2/>
      </>
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

     </div>


 )

}