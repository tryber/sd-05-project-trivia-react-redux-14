import React, { Component } from 'react';
import Header from '../components/Header';

export default class Ranking extends Component {
  render() {
    return (
      <header>
        <h1 data-testid="ranking-title">RANKING</h1>
        <Header />
      </header>
    );
  }
}
