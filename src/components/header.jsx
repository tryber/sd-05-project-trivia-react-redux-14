import React, { Component } from 'react';

export default class header extends Component {
  render() {
    return (
      <div>
        <img src={`https://www.gravatar.com/avatar/${hash}`} />
        <p>Jogador: {nome}</p>
        <p>Score: {placar}</p>
      </div>
    );
  }
}
