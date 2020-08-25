import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
// import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  componentDidMount() {
    this.text();
    const { nome, hash, placar } = this.props;
    const newRanking =  {name: nome, score: placar, picture: `https://www.gravatar.com/avatar/${hash}`}
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

// ranking
// [
//   {name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar}
// ]

  text() {
    const { acertos } = this.props;
    if (acertos >= 3) {
      return this.setState({ message: 'Mandou bem!' });
    }
    return this.setState({ message: 'Podia ser melhor...' });
  }

  render() {
    const { nome, hash, placar, acertos } = this.props;
    return (
      <div>
        <header>
          <p data-testid="header-score">{placar}</p>
        </header>
        <h1>FEEDBACK</h1>
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${hash}`}
          alt="foto de perfil"
        />
        <p data-testid="header-player-name">Jogador: {nome}</p>
        <p data-testid="feedback-total-score">{placar}</p>
        <p data-testid="feedback-total-question">{acertos}</p>
        <Link data-testid="btn-play-again" to="/">
          Home
        </Link>
        <Link data-testid="btn-ranking" to="/ranking">
          Ranking
        </Link>
        <h2 data-testid="feedback-text">{this.state.message}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.loginReducer.login.nome,
  hash: state.loginReducer.login.hash,
  placar: state.placarReducer.scoreR,
  acertos: state.placarReducer.assertionsR,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  nome: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
  acertos: PropTypes.number.isRequired,
};
