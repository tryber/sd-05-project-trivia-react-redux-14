import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { Redirect } from 'react-router-dom';

export class TelaJogo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isClicked: false };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.clickC = this.clickC.bind(this);
    this.clickI = this.clickI.bind(this);
  }
  // prettier-ignore
  nextQuestion() {
    this.setState({isClicked: false});
    this.setState((previousState) => ({ count: previousState.count + 1 }));
    console.log(this.state.count);
  }

  // prettier-ignore
  clickC() {
    this.setState({isClicked: true});
    console.log(this.state.isClicked);
  }

  // prettier-ignore
  clickI () {
    this.setState({isClicked: true});
    console.log(this.state.isClicked);
  }

  render() {
    const { perguntas } = this.props;
    const { count, isClicked } = this.state;
    if (count > 4) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        <Header />
        <h1>Tela de Jogo</h1>
        {perguntas[count] && (
          <div>
            <p data-testid="question-category">
              Category: {perguntas[count].category}
            </p>
            <p data-testid="question-text">
              Question: {perguntas[count].question}
            </p>
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
                data-testid={`wrong-answer-${i}`}
                onClick={() => this.clickI()}
                disabled={isClicked}
                className={isClicked ? 'red-border' : null}
              >
                {respostaI}
              </button>
            ))}
            {isClicked && (
              <button onClick={() => this.nextQuestion()}>Next Question</button>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  perguntas: state.tokenReducer.questions,
});

export default connect(mapStatetoProps)(TelaJogo);

TelaJogo.propTypes = {
  perguntas: PropTypes.arrayOf(PropTypes.object).isRequired,
};
