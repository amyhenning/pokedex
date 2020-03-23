import React, { Component } from 'react';
import './Stats.css';

class Stats extends Component {
	generateIdNo(min, max) {
	  return Math.floor(Math.random() * (max - min) + min);
	}

	formatTypes(types) {
		types.map((type, index) => {
			return (
				<div>
					<p>TYPE{index+1}/</p>
					<p className="indented">{type.toUpperCase()}</p>
				</div>
			)
		});
	}

	render() {
		return (
			<div id="stats-border">
				<div id="stats-container">
					<section id="top-section-container">
						<figure id="sprite-container">
							<img src={this.props.spriteUrl} className="sprite-image" alt="Pokemon sprite from the games" />
							<figcaption><span className="tiny-text">No.</span> {this.props.id}</figcaption>
						</figure>

						<div id="health-status">
							<p>{this.props.name.toUpperCase()}</p>
							<p id="level" className="right-align"><span className="tiny-text">:L</span>75</p>
							<div id="hp-bar-container">
								<p><span className="tinier-text">HP:</span></p>
								<div id="hp-bar"></div>
							</div>
							<div id="hp-data">
								<p>{this.props.hp} / {this.props.hp}</p>
							</div>
							<p>STATUS/OK</p>
						</div>
					</section>
					<div id="pokeballs">
						<div className="pokeball top-left">
							<div className="pokeball-upper"></div>
							<div className="pokeball-lower"></div>
						</div>
						<div className="pokeball top-right">
							<div className="pokeball-upper"></div>
							<div className="pokeball-lower"></div>
						</div>
						<div className="pokeball bottom-left">
							<div className="pokeball-upper"></div>
							<div className="pokeball-lower"></div>
						</div>
						<div className="pokeball bottom-right">
							<div className="pokeball-upper"></div>
							<div className="pokeball-lower"></div>
						</div>
					</div>
					<section id="detailed-stats">
						<div id="basic-stats-border">
							<div id="basic-stats-box">
								<p className="left-align">ATTACK</p>
								<p className="right-align bold-stats">{this.props.attack}</p>
								<p className="left-align">DEFENSE</p>
								<p className="right-align bold-stats">{this.props.defense}</p>
								<p className="left-align">SPEED</p>
								<p className="right-align bold-stats">{this.props.speed}</p>
								<p className="left-align">SP. ATT.</p>
								<p className="right-align bold-stats">{this.props.specialAttack}</p>
								<p className="left-align">SP. DEF.</p>
								<p className="right-align bold-stats">{this.props.specialDefense}</p>
							</div>
						</div>

						<div id="type-panel">
							{this.props.types.map((type, index) =>
								<div key={'typeContainer-' + index.toString()}>
									<p key={'type-' + index.toString()}>TYPE<span className="tiny-text">{index + 1}</span>/</p>
									<p key={'typeName-' + index.toString()} className="indented">{type.toUpperCase()}</p>
								</div>
							)}
						<p className="tiny-text">ID No./</p>
							<p className="indented bold-stats">{this.generateIdNo(1000, 10000000)}</p>
							<p>OT/</p>
							<p className="indented">Ash</p>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default Stats;
