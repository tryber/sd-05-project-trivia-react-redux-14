import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { handleSubmit, fetchToken } from '../actions';

const CryptoJS = require('crypto-js');

class PaginaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = { nome: '', email: '', hash: '', clicked: false };
    this.nomeChange = this.nomeChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.cR = this.cR.bind(this);
  }

  nomeChange(event) {
    this.setState({ nome: event.target.value });
  }

  emailChange(event) {
    this.setState({ email: event.target.value });
    const cryptoMail = CryptoJS.MD5(event.target.value).toString();
    this.setState({ hash: cryptoMail });
  }

  cR() {
    this.setState({ clicked: true });
  }

  render() {
    const { handClick } = this.props;
    const { clicked, email, nome } = this.state;
    const e = !email || !nome;
    if (clicked) return <Redirect to="/game" />;
    return (
      <div>
        <Link to="/settings" data-testid="btn-settings">Configurações</Link>
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
        <button data-testid="btn-play" disabled={e} onClick={() => { handClick(this.state); this.cR(); }}>
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handClick: (login) => dispatch(handleSubmit(login), fetchToken()),
});

export default connect(null, mapDispatchToProps)(PaginaInicial);

PaginaInicial.propTypes = {
  handClick: PropTypes.func.isRequired,
};
