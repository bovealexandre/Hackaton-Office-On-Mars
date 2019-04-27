import React, { useState, setState } from 'react';
import './App.css';
import { Planet } from './Planet';
import { InfoPlanet } from './InfoPlanet';
import { InfoMeteo } from './InfoMeteo';
import SpeechRecognition from 'react-speech-recognition';
import Speech from 'speak-tts'

const App = (props) => {
  const [tempMedium, setTempMedium] = useState('25 °C');
  const [coord, setCoord] = useState(['Latitude : 50.6412', 'Longitude : 5.5718']);
  const [day, setDay] = useState('Vendredi 25 Avril 2025');
  const [time, setTime] = useState('15h15');
  const [atmos, setAtmos] = useState();
  const [danger, setDanger] = useState(false);
  const [params, setParams] = useState();
  const [tabData, setData] = useState([{ 'time': '16H00', 'wind': '750 hpa', 'temp': '25°', 'rad': '32 msv' }])
  
  const speech = new Speech()
    speech.init({
      'volume': 1,
      'lang': 'en-GB',
      'voice':'Fiona',
      'rate': 1,
      'pitch': 1,
      'listeners': {
        'onvoiceschanged': (voices) => {
          console.log("Event voiceschanged", voices)
        }
      }
    })
    function speak(){
      speech.speak({
        text: 'Hello, how are you today ?',
      })
    }

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = props
  const [listening, setListening] = useState(false);
  return (
    <div className="App">
      <Planet coord={coord} />
      <InfoPlanet day={day} time={time} temp={tempMedium} coord={coord} />
      <InfoMeteo tabData={tabData} />
      <button onClick={speak}>Speak</button>
    </div>
  );
}

export default SpeechRecognition(App);
