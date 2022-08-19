import React from 'react';
import Tabs from "./components/Tabs/Tabs";
import './App.css';

function App() {
  return (
    <div>
      <h1>Trading-UI</h1>
      <Tabs>
        <div label="Portfolio">
          Nothing here, <em>YET</em>!
        </div>
        <div label="Trade">
          Nothing here, <em>YET</em>!
        </div>
      </Tabs>
    </div>
  );
}

export default App;