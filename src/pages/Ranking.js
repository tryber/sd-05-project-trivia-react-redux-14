import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    const rankList = JSON.parse(localStorage.getItem('ranking'));
    const rankOrder = rankList.sort((a, b) => b.score - a.score);
    const Mapa = rankOrder.map((jogador, index) => (
      <div key={jogador.name}>
        <img src={jogador.picture} alt={jogador.name} />
        <p data-testid={`player-name-${index}`}>{jogador.name}</p>
        <p data-testid={`player-score-${index}`}>{jogador.score}</p>
      </div>),
    );
    return (
      <div>
        <header>
          <Link to="/" data-testid="btn-go-home">
            Jogar Denovo!
          </Link>
          <h1 data-testid="ranking-title">RANKING</h1>
        </header>
        <section>
          <div>{Mapa}</div>
        </section>
      </div>
    );
  }
}
