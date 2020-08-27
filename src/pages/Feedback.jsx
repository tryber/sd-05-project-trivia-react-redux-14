import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { zCounter, clearLog, zeroDados } from '../actions';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  componentDidMount() {
    this.text();
    const oldRanking = JSON.parse(localStorage.getItem('ranking'));
    const { nome, hash, placar } = this.props;
    const newRanking = { name: nome, score: placar, picture: `https://www.gravatar.com/avatar/${hash}` };
    if (oldRanking) {
      return localStorage.setItem('ranking', JSON.stringify([...oldRanking, newRanking]));
    }
    return localStorage.setItem('ranking', JSON.stringify([newRanking]));
  }

  text() {
    const { acertos } = this.props;
    if (acertos >= 3) {
      return this.setState({ message: 'Mandou bem!' });
    }
    return this.setState({ message: 'Podia ser melhor...' });
  }

  clearStore() {
    const { zeroCount, clearLogin, clearPlacar } = this.props;
    zeroCount();
    clearLogin();
    clearPlacar();
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
        <Link data-testid="btn-play-again" to="/" onClick={() => this.clearStore()}>
          Home
        </Link>
        <Link data-testid="btn-ranking" to="/ranking" onClick={() => this.clearStore()}>
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

const mapDispatchtoProps = (dispatch) => ({
  zeroCount: () => dispatch(zCounter()),
  clearLogin: () => dispatch(clearLog()),
  clearPlacar: () => dispatch(zeroDados()),
});

export default connect(mapStateToProps, mapDispatchtoProps)(Feedback);

Feedback.propTypes = {
  nome: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
  acertos: PropTypes.number.isRequired,
  zeroCount: PropTypes.func.isRequired,
  clearLogin: PropTypes.func.isRequired,
  clearPlacar: PropTypes.func.isRequired,
};
