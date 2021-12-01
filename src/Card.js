import React, { Component } from 'react'
import './Card.css'

class Card extends Component {
  constructor(props) {
    super(props)
    let angle = Math.random()*90 - 45
    let posX = Math.random()*40 - 20
    let posY = Math.random()*40 - 20
    this._transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`

  }
  render() {
    // transform: translate(10px, 20px) rotate(10deg);
    return (
      <img style={{transform: this._transform}} className="Card" src={this.props.image} alt={this.props.name}/>
    )
  }
}

export default Card