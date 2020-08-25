import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';

export default class Ranking extends Component {
  render() {
    const rankList = JSON.parse(localStorage.getItem('ranking'));
    const rankOrder = rankList.sort((a, b) => b.score - a.score);
    return (
      <div>
        <header>
          <Link to="/" data-testid="btn-go-home">
            Jogar Denovo!
          </Link>
          <h1 data-testid="ranking-title">RANKING</h1>
        </header>
        <section>
          {rankOrder.map((player, index) => {
            return (
              <div>
                <img src={player.picture} alt={player.name} />
                <p data-testid={`player-name-${index}`}>{player.name}</p>
                <p data-testid={`player-score-${index}`}>{player.score}</p>
              </div>
            );
          })
          }
        </section>
      </div>
    );
  }
}
