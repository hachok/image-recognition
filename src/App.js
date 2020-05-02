import React, {useEffect} from 'react';
import './App.css';
import * as ml5 from 'ml5';
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const App = () => {
    const webcamRef = React.useRef(null);

    const classifyImg = () => {
        // Initialize the Image Classifier method with MobileNet
        const classifier = ml5.imageClassifier('MobileNet', webcamRef.current, modelLoaded);

        // When the model is loaded
        function modelLoaded() {
            console.log('Model Loaded!');
        }

        // Put the image to classify inside a variable
        const image = document.getElementById('image');
        // Make a prediction with a selected image
        classifier.predict(image, 5, function (err, results) {
            // print the result in the console
            console.log(results);
        })
    }

    const capture = React.useCallback(
        () => {
            console.log('webcamRef.current', webcamRef.current);
            const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );

    useEffect(() => {
        classifyImg();
    }, []);

    return (
        <div className="App">
            <h1>Image classification with ML5.js</h1>
        </div>
    );
}

export default App;
