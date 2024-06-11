import './App.css';

import Calendar from'./components/Calendar'
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Velkommen til Livscyklus</h1>
        <p>
          Dette er en personlig app til Liv for at følge hendes cyklus.
        </p>
      </header>
      <div className='CalendarBox'>
        <Calendar />
      </div>

    </div>
  );
}

export default App;
