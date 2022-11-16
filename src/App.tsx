import { useState, useEffect, useRef } from 'react';
import './App.css';
import wordsData from './words.json';

function App() {
  function generateGuesses() {
    const guesses: any = [];
    for (let i = 0; i <= 5; i++) {
      guesses.push([]);
      for (let j = 0; j <= 4; j++) {
        guesses[i].push({ char: '', included: false, correct: false });
      }
    }
    return guesses;
  }

  const [answer, setAnswer] = useState();
  const [guesses, setGuesses] = useState(generateGuesses());
  const [editingInput, setEditingInput] = useState({ row: 0, box: 0 });

  let words: any;

  useEffect(() => {
    words = wordsData.map((wordObj) => wordObj.word.toLowerCase());
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
      setEditingInput({ row: 0, box: 1 });
    }
  }, [guesses]);

  function handleType(e: any, rowIdx: number, boxIdx: number) {
    setGuesses((prevGuesses: any) =>
      prevGuesses.map((row: any, prevRowIdx: number) =>
        row.map((box: any, prevBoxIdx: number) => {
          if (rowIdx === prevRowIdx && boxIdx === prevBoxIdx) {
            return { ...box, char: e.target.value };
          }
          return box;
        })
      )
    );
    console.dir(e.target);
  }

  return (
    <div className="App">
      <div className="grid">
        {guesses.map((row: any, rowIdx: number) =>
          row.map((box: any, boxIdx: number) => {
            return (
              <input
                type="text"
                key={rowIdx + boxIdx}
                className="box"
                value={box.char}
                onChange={(e) => handleType(e, rowIdx, boxIdx)}
                maxLength={1}
                autoFocus={rowIdx === 0 && boxIdx === 0 ? true : false}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
