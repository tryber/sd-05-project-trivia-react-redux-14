import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';

export class TelaJogo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    this.setState((previousState) => {
      return { count: previousState.count + 1 };
    });
    console.log(this.state.count);
  }

  render() {
    const { perguntas, fetching } = this.props;
    const { count } = this.state;
    return (
      <div>
        <Header />
        <h1>TELA DE JOGO</h1>
        {perguntas[count] && (
          <div>
            <p data-testid="question-category">
              Category: {perguntas[count].category}
            </p>
            <p data-testid="question-text">
              Question: {perguntas[count].question}
            </p>
            <button onClick={() => this.nextQuestion()}>Next Question</button>
          </div>
        )}
        {/* { perguntas[0] && <p>Question: {perguntas[0].question}</p> } */}
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  perguntas: state.tokenReducer.questions,
  fetching: state.tokenReducer.isFetching,
});

export default connect(mapStatetoProps)(TelaJogo);
