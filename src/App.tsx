import React from "react";
import "./App.css";
import { Button } from "@material-ui/core/";
import { Language, PhoneIphone, Phone, MusicNote } from "@material-ui/icons/";

var seenWords: Set<number> = new Set();
const words: string[] = ["Telphone", "Music", "Internet", "AI", "Book", "Fashion", "Social Network", "Delivery", "Taxi", "Software Enginner"];

function getWord(): string {
  var i: number = Math.floor(Math.random() * words.length);
  while (seenWords.has(i)) {
    i = Math.floor(Math.random() * words.length);
  }
  seenWords.add(i);
  return words[i];
}

const App: React.FC = () => {
  const [threeWords, setThreeWords] = React.useState<string[]>([getWord(), getWord(), getWord()]);

  function resetWords(e: any) {
    seenWords = new Set();
    setThreeWords([getWord(), getWord(), getWord()]);
  }

  return (
    <div className='App'>
      <header>
        <h1>Idea Bank</h1>
      </header>
      <article>
        <h2>Let's think creatively!</h2>
        <p className='description'>Come up with a new idea by combining the following three words.</p>
        <p className='description'>
          ex.)　
          <Phone /> Telephone　✖️　
          <MusicNote /> Music　✖️　
          <Language /> Internet　=　
          <PhoneIphone /> iPhone
        </p>
        <ul className='slot-words'>
          <li>{threeWords[0]}</li>
          <li className='right-border middle-li'></li>
          <li>{threeWords[1]}</li>
          <li className='right-border middle-li'></li>
          <li>{threeWords[2]}</li>
        </ul>
        <Button variant='contained' color='primary' onClick={resetWords}>
          Shuffle
        </Button>
      </article>
      <footer>2020 © **** All Rights Reserved.</footer>
    </div>
  );
};

export default App;
