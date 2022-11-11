import { useState, useEffect } from 'react';
import './App.css';
import wordsData from './words.json';

function App() {
  const [answer, setAnswer] = useState();

  function generateGuesses() {
    const guesses: any = [];
    for (let i = 0; i <= 5; i++) {
      guesses.push([]);
      for (let j = 0; j <= 4; j++) {
        guesses[i].push({ char: null, included: false, correct: false });
      }
    }
    return guesses;
  }

  const [guesses, setGuesses] = useState(generateGuesses());

  let words: any;

  useEffect(() => {
    words = wordsData.map((word) => word.word.toLowerCase());
    setAnswer(words[Math.floor(Math.random() * words.length)]);
  }, []);

  useEffect(() => {
    if (answer) {
      console.log(answer);
    }
  }, [answer]);

  useEffect(() => {
    if (guesses) {
      console.log(guesses);
    }
  }, [guesses]);

  return (
    <div className="App">
      <div className="grid">
        {guesses.map((row: any, rowIdx: number) =>
          row.map((box: any, boxIdx: number) => {
            return <input type="text" key={rowIdx + boxIdx} className="box" />;
          })
        )}
      </div>
    </div>
  );
}

export default App;
