import background from './assets/background.jpeg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

async function getData (setLetters, setClue) {
  const url = 'https://script.google.com/macros/s/AKfycbw0J67UX3VMM_EuhFXuvtejewl7LhdoIJkpOtHNu_5puShxXITqMjV2thuY2l2y4e0U/exec';
  axios.get(url).then((e) => {
    const result = e.data.split(',');
    const obj = {Letters: [], Clue: []};
    let current = 'letters';
    result.forEach(r => {
      if (r === 'Letters' || r === 'Clue') current = r;
      else {
        if (r) obj[current].push(r);
      }
    });
    setLetters(obj.Letters);
    setClue(obj.Clue);
  });
}

function App() {
  const [clue, setClue] = useState([]);
  const [listOfLetters, setListofLetters] = useState([]);

  useEffect(() => {
    getData(setListofLetters, setClue);
  }, []);

  return (
    <div className="main-frame">
      <img src={background} className='background-img' alt='' width={'100%'} height={'100%'}/>
      <div className='letters-area'>
        {listOfLetters.length === 0 && <div>Letters will appear here.</div>}
        {listOfLetters.length>0 && <div style={{ fontSize: 'xx-large' }}>{listOfLetters.join('  ')}</div>}
      </div>
      <div className='clue-area'>
        { clue.length===0 && <div>Clues will be displayed here.</div>}
        { clue.length>0 &&  <div>{clue.join("\n\n\n")}</div>}
      </div>
    </div>
  );
}

export default App;
