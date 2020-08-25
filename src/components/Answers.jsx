import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { counter, dados } from '../actions';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      isAssertion: false,
      timer: 30,
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    this.nQ = this.nQ.bind(this);
    this.clickC = this.clickC.bind(this);
    this.clickI = this.clickI.bind(this);
  }
  
  componentDidMount() {
    this.intervalChange();
  }

  componentDidUpdate() {
    const {playerR} = this.props;
    playerR(this.state.player);
  }

  intervalChange() {
    this.setState({ timer: 30 });
    this.myInterval = setInterval(() => {
      if (this.state.timer === 1) {
        clearInterval(this.myInterval);
      }
      this.setState((previousState) => ({
        timer: previousState.timer - 1,
      }));
      if (this.state.isClicked) {
        clearInterval(this.myInterval);
      }
      this.timeOut();
    }, 1000);
  }

  // prettier-ignore
  nQ() {
    const { counterF, nome, email, playerR } = this.props;
    this.setState({
      isClicked: false,
      player: { ...this.state.player, name: nome, gravatarEmail: email },
    });
    counterF();
    clearInterval(this.myInterval);
    this.intervalChange();
    playerR(this.state.player);
    localStorage.setItem('state', this.state.player);
    // console.log(this.state.player);
  }
  
  // prettier-ignore
  clickC() {
    const { player } = this.state;
    this.setState({ isClicked: true });
    this.points();
    // console.log(this.state.player.assertions);
  }

  // prettier-ignore
  clickI() {
    this.setState({ isClicked: true });
  }

  timeOut() {
    if (this.state.timer === 0) {
      this.setState({ isClicked: true });
    }
  }

  // prettier-ignore
  points() {
    const { perguntas, count } = this.props;
    let dif = 0;
    switch (perguntas[count].difficulty) {
      case 'hard':
        dif = 3;
        break;
      case 'medium':
        dif = 2;
        break;
      case 'easy':
        dif = 1;
        break;
      default:
        dif = 0;
        break;
    }
    this.setState({
      player: {
        ...this.state.player,
        score: this.state.player.score + ((this.state.timer * dif) + 10),
        assertions: this.state.player.assertions + 1,
      },
    });
    // playerR(this.state.player);
  }

  // prettier-ignore
  render() {
    const { perguntas, count } = this.props;
    const { isClicked } = this.state;
    return (
      <div>
        <h2>{this.state.timer}</h2>
        {perguntas[count] && (
          <div>
            <button
              data-testid="correct-answer"
              onClick={() => this.clickC()}
              disabled={isClicked}
              className={isClicked ? 'green-border' : null}
            >
              {perguntas[count].correct_answer}
            </button>
            {perguntas[count].incorrect_answers.map((respostaI, i) => (
              <button
                data-testid={`wrong-answer-${i}`} onClick={() => this.clickI()}
                disabled={isClicked} className={isClicked ? 'red-border' : null}
              >
                {respostaI}
              </button>
            ))}
            {isClicked && (<button data-testid="btn-next" onClick={() => this.nQ()}>Next</button>)}
          </div>
        )}
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  perguntas: state.tokenReducer.questions,
  count: state.counterReducer.count,
  nome: state.loginReducer.login.nome,
  email: state.loginReducer.login.email,
});

const mapDispatchtoProps = (dispatch) => ({
  counterF: () => dispatch(counter()),
  playerR: (player) => dispatch(dados(player)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Answers);

Answers.propTypes = {
  perguntas: PropTypes.arrayOf(PropTypes.object).isRequired,
  counterF: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  playerR: PropTypes.shape({
    scoreR: PropTypes.number,
    assertionsR: PropTypes.number,
  }).isRequired,
};
