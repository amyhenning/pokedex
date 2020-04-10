import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pokedex from './Pokedex';

function App() {
  return (
    <div className="App">
      <Pokedex />

			<footer id="footer">
				<p className="footer-text">Hand-coded by <a href="https://amyhenning.codes">Amy Henning</a>, 2020</p>
			</footer>
    </div>
  );
}

export default App;
