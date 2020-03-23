import React, { Component } from 'react';
import './BasicInfo.css';

class BasicInfo extends Component {
	render() {
		return (
			<div id="basic-info-border">
				<div id="basic-info-container">
					<section id="top-section-container">
						<figure id="sprite-container">
							<img src={this.props.spriteUrl} className="sprite-image" alt="Pokemon sprite from the games" />
							<figcaption><span className="tiny-text">No.</span> {this.props.id}</figcaption>
						</figure>
						<div id="vitals">
							<p>{this.props.name.toUpperCase()}</p>
							<p>HT <span className="bold-stats">{this.props.height}m</span></p>
							<p>WT <b>{this.props.weight}</b>kg</p>
						</div>
					</section>
					<div id="boxes">
						<div id="box-group-left">
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
						</div>

						<div id="box-group-right">
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
							<div className="box"></div>
						</div>
					</div>
					<hr />
					<section id="pokemon-description">
						<p>{this.props.flavorText}</p>
					</section>
				</div>
			</div>
		)
	}
}

export default BasicInfo;
