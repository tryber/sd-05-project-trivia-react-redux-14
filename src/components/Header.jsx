import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { nome, hash, placar } = this.props;
    return (
      <div>
        <img 
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${hash}`}
          alt="foto de perfil"
        />
        <p data-testid="header-player-name">Jogador: {nome}</p>
        <p data-testid="header-score">Score: {placar}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.loginReducer.login.nome,
  hash: state.loginReducer.login.hash,
  placar: state.loginReducer.login.placar,
})

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
};
