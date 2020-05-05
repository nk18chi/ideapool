import React from "react";
import "./App.css";
import { Button } from "@material-ui/core/";
import { Language, PhoneIphone, Phone, MusicNote } from "@material-ui/icons/";

function App() {
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
          <li>Telephone</li>
          <li className='right-border middle-li'></li>
          <li>Music</li>
          <li className='right-border middle-li'></li>
          <li>Internet</li>
        </ul>
        <Button variant='contained' color='primary'>
          Shuffle
        </Button>
      </article>
      <footer>2020 © ideabank.com All Rights Reserved.</footer>
    </div>
  );
}

export default App;
