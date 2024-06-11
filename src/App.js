import './App.css';

import Calendar from'./components/Calendar'
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Velkommen til Livs-cyklus</h1>
        <p>
          Dette er en app til at følge sin cyklus.
        </p>
      </header>
      <div className='CalendarBox'>
        <Calendar />
      </div>

    </div>
  );
}

export default App;
