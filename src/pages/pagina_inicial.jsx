import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PaginaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = { nome: '', email: '' };
    this.nomeChange = this.nomeChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
  }

  nomeChange(event) {
    this.setState({ nome: event.target.value });
  }

  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div>
        <header>
          {/* <Link to="" data-testid="btn-settings">
            Configurações
          </Link> */}
        </header>
        <label htmlFor="nome">
          Nome
          <input type="text" data-testid="input-player-name" value={this.state.nome} onChange={this.nomeChange} />
        </label>
        <label htmlFor="email">
          E-mail
          <input type="email" data-testid="input-gravatar-email" value={this.state.email} onChange={this.emailChange}/>
        </label>
        <button data-testid="btn-play" onClick={() => {console.log(this.state)}}>Jogar</button>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//     handleSubmit: (values) => dispatch(filterByNumericValues(values)),
//   });
