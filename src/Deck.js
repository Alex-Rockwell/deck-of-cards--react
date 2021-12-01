import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card'
import './Deck.css'
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck'

class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: null,
      drawn: []
    }
    this.getCard = this.getCard.bind(this)
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`)
    this.setState({deck: deck.data})
  }
  async getCard() {
    try {
      let cardUrl = `${API_BASE_URL}/${this.state.deck.deck_id}/draw/`
      let cardRes = await axios.get(cardUrl)
      if (!cardRes.data.success) {
        throw new Error ('No card remaining')
      }
      console.log(cardRes.data)
      let card = cardRes.data.cards[0]
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.suit} ${card.value}`
          }
        ]
      }))
    }
    catch(err) {
      alert(err)
    }
  }
  render() {
    const cards = this.state.drawn.map(c => (
      <Card image={c.image} alt={c.name} key={c.id}/>
    ))
    return (
      <div className="Deck">
        <h1 className="Deck-title">♣️ Card Dealer ♣️</h1>
        <h2 className="Deck-title Deck-subtitle">♣️ A random card generator ♣️</h2>
        <button className="Deck-btn" onClick={this.getCard}>Get card!</button>
        <div className="Deck-cardarea">
          {cards}
        </div>
      </div>
    )
  }
}

export default Deck