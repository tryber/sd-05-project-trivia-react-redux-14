import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { handleSubmit } from '../actions';

const CryptoJS = require('crypto-js');

class PaginaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = { nome: '', email: '', hash: '', clicked: false };
    this.nomeChange = this.nomeChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
  }

  nomeChange(event) {
    this.setState({ nome: event.target.value });
  }

  emailChange(event) {
    this.setState({ email: event.target.value });
    const cryptoMail = CryptoJS.MD5(event.target.value).toString();
    this.setState({ hash: cryptoMail });
  }

  clickRedirect() {
    this.setState({ clicked: true });
  }

  render() {
    const { handleClick } = this.props;
    const { clicked } = this.state;
    if(clicked) return <Redirect to="/game" />;
    return (
      <div>
        <header>
        <Link to="/settings" data-testid="btn-settings">
            Configurações
          </Link>
        </header>
        <label htmlFor="nome">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            value={this.state.nome}
            onChange={this.nomeChange}
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            data-testid="input-gravatar-email"
            value={this.state.email}
            onChange={this.emailChange}
          />
        </label>
        <button data-testid="btn-play" onClick={() => { handleClick(this.state); this.clickRedirect() }}>
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClick: (login) => dispatch(handleSubmit(login)),
});

export default connect(null, mapDispatchToProps)(PaginaInicial);

PaginaInicial.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
