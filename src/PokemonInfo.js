import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import Stats from './Stats';
import './PokemonInfo.css';

class PokemonInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showInfo: '',
			pokemonData: {},
			dataFormatted: '',
			error: '',
		};
		this.togglePokemonInfo = this.togglePokemonInfo.bind(this);
		this.getPokemonInfo = this.getPokemonInfo.bind(this);
		this.getSpeciesInfo = this.getSpeciesInfo.bind(this);
		this.formatAllData = this.formatAllData.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	getPokemonInfo() {
		const pokemonBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';
		const pokemonResponse = fetch(pokemonBaseUrl + this.props.pokemonName.toLowerCase())
			.then(response => {
				if (!response.ok) {
					console.error(`Error: ${response.status}. Likely caused by invalid input.`);
				};
				return response.json();
			});
		return pokemonResponse;
	}

	getSpeciesInfo() {
		const speciesBaseUrl = 'https://pokeapi.co/api/v2/pokemon-species/';
		const speciesResponse = fetch(speciesBaseUrl + this.props.pokemonName.toLowerCase())
			.then(response => {
				if (!response.ok) {
					console.error(`Error: ${response.status}. Likely caused by invalid input.`);
				};
				return response.json();
			});
		return speciesResponse;
	}

	decimetersToMeters(decimeters) {
		const meters = decimeters / 10;
		return meters;
	}

	hectogramsToKilograms(hectograms) {
		const kilograms = hectograms / 10;
		return kilograms;
	}

	padToThree(id) {
		return id <= 999 ? `00${id}`.slice(-3) : id;
	};

	// combine data from 2 different API endpoints into one object
	formatAllData(pokemonData, speciesData) {
		let combinedData = {};
		combinedData['name'] = pokemonData['name'].charAt(0).toUpperCase() + pokemonData['name'].slice(1);
		combinedData['height'] = this.decimetersToMeters(pokemonData['height']);
		combinedData['weight'] = this.hectogramsToKilograms(pokemonData['weight']);
		combinedData['spriteUrl'] = pokemonData['sprites']['front_default'];
		pokemonData['stats'].map(stat => combinedData[stat['stat']['name']] = stat['base_stat']);
		combinedData['types'] = pokemonData['types'].map(type => type['type']['name']);
		combinedData['id'] = this.padToThree(speciesData['pokedex_numbers'].pop()['entry_number']);
		combinedData['flavorText'] = speciesData['flavor_text_entries'].pop()['flavor_text']
		return combinedData;
	}

	componentDidMount() {
		Promise.all([this.getPokemonInfo(), this.getSpeciesInfo()])
		.then(([pokemonData, speciesData]) => {
			this.setState({
				pokemonData: this.formatAllData(pokemonData, speciesData),
				showInfo: true,
				dataFormatted: true,
				error: false,
			});
    })
    .catch(error => {
			this.setState({
				error: true,
			});
    })
	};

	togglePokemonInfo() {
		this.setState(st => {
			return {
				showInfo: !st.showInfo,
			}
		});
	};

	renderContent() {
		if (!this.state.error) {
			if (!this.state.showInfo && !this.state.dataFormatted) {
				return <h3 id="loading-message">Loading . . .</h3>
			} else if (this.state.dataFormatted) {
				if (this.state.showInfo) {
					return (
						<div id="basic-info-component">
							<BasicInfo
								name={this.state.pokemonData.name}
								height={this.state.pokemonData.height}
								weight={this.state.pokemonData.weight}
								id={this.state.pokemonData.id}
								flavorText={this.state.pokemonData.flavorText}
								spriteUrl={this.state.pokemonData.spriteUrl}
							/>
							<button id="toggle-arrows" onClick={this.togglePokemonInfo}>&#62;&#62;</button>
						</div>
					)
				} else if (!this.state.showInfo) {
					return (
						<div id="stats-component">
							<Stats
								name={this.state.pokemonData.name}
								spriteUrl={this.state.pokemonData.spriteUrl}
								attack={this.state.pokemonData.attack}
								defense={this.state.pokemonData.defense}
								hp={this.state.pokemonData.hp}
								specialDefense={this.state.pokemonData['special-defense']}
								specialAttack={this.state.pokemonData['special-attack']}
								speed={this.state.pokemonData.speed}
								types={this.state.pokemonData.types}
								id={this.state.pokemonData.id}
							/>
							<button id="toggle-arrows" onClick={this.togglePokemonInfo}>&#60;&#60;</button>
						</div>
					)
				}
			}
		} else {
			return <h3 id="error-message">Error! No such Pokémon found.</h3>
		}
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		)
	}
}

export default PokemonInfo;
