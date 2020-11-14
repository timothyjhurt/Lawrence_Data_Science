import React from 'react';
import '../../App.css';

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


    document.body.appendChild(myWizard.buttonElement);
    const myCamera = myWizard.createInferenceCamera();
    document.body.appendChild(myCamera);

  return <h1 className='Experience2'> Experience2 </h1>;
}
