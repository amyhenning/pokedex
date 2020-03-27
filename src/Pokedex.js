import React, { Component } from 'react';
import PokemonInfo from './PokemonInfo';
import './Pokedex.css';

class Pokedex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			isSubmitted: false,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	};

  handleChange(event) {
    this.setState({
    	value: event.target.value,
    	isSubmitted: false,
    });
  };

  handleSubmit(event) {
  	event.preventDefault(); 
  	let stringTest = /A-Za-z/;
  	if (stringTest.test(this.state.value)) {
	  	this.setState({
	  		value: this.state.value,
	  		isSubmitted: !this.state.isSubmitted,
	  	});
  	} else {
  		console.error('Error: Search term must be a string.');
  	}
  };

  handleClick(event) {
  	event.preventDefault(); 
  	this.setState({
  		value: '',
  		isSubmitted: false,
  	});
  }

	render() {
		return (
			<div id="pokedex-container">
				<main id="pokedex-main">
					<h1>Pokédex!</h1>
					<form onSubmit={this.handleSubmit.bind(this)} className="form">
		        <label className="label">
		          Enter Pokémon Name:
		          <br /><br />
		          <input type="text" className="input-field" value={this.state.value} onChange={this.handleChange} />
		        </label>
		        <input type="submit" className="button" value="Submit" />
		      </form>
		      <br />
		      <button className="button" onClick={this.handleClick}>Start Over</button>
		      {this.state.isSubmitted && this.state.value && <PokemonInfo pokemonName={this.state.value} />}
				</main>

			</div>
		)
	}
}

export default Pokedex;
