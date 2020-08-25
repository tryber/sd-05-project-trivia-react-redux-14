import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  componentDidMount() {
    this.text();
  }

  text() {
    const { acertos } = this.props;
    (acertos >= 3)
      ? this.setState({ message: 'Mandou bem!' })
      : this.setState({ message: 'Podia ser melhor...' });
  }

  render() {
    const { nome, hash, placar, acertos } = this.props;
    return (
      <header>
        <h1>FEEDBACK</h1>
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${hash}`}
          alt="foto de perfil"
        />
        <p data-testid="header-player-name">Jogador: {nome}</p>
        <p data-testid="feedback-total-score">Score: {placar}</p>
        <p data-testid="feedback-total-question">Acertos: {acertos}</p>
        <Link data-testid="btn-play-again" to="/">
          Home
        </Link>
        <Link data-testid="btn-ranking" to="/ranking">
          Ranking
        </Link>
        <h2 data-testid="feedback-text">{this.state.message}</h2>
      </header>
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
