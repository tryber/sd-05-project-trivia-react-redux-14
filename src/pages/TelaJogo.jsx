import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export class TelaJogo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    this.setState((previousState) => {
      count: previousState.count + 1;
    });
    console.log(this.state.count);
  }

  render() {
    const { perguntas } = this.props;
    const { count } = this.state;
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
            <button data-testid="correct-answer">
              {perguntas[count].correct_answer}
            </button>
            {perguntas[count].incorrect_answers.map((respostaI, i) => (
              <button data-testid={`wrong-answer-${i}`}>{respostaI}</button>
            ))}
            <button onClick={() => this.nextQuestion()}>Next Question</button>
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

TelaJogo.PropTypes = {
  perguntas: PropTypes.arrayOf(PropTypes.object).isRequired,
};
