import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { counter } from '../actions';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.clickC = this.clickC.bind(this);
    this.clickI = this.clickI.bind(this);
  }

  // prettier-ignore
  nextQuestion() {
    const { counterF } = this.props;
    this.setState({ isClicked: false });
    counterF();
  }

  // prettier-ignore
  clickC() {
    this.setState({ isClicked: true });
  }

  // prettier-ignore
  clickI() {
    this.setState({ isClicked: true });
  }

  render() {
    const { perguntas, count } = this.props;
    const { isClicked } = this.state;
    return (
      <div>
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
                data-testid={`wrong-answer-${i}`}
                onClick={() => this.clickI()}
                disabled={isClicked}
                className={isClicked ? 'red-border' : null}
              >
                {respostaI}
              </button>
            ))}
            {isClicked && (<button onClick={() => this.nextQuestion()}>Next Question</button>)}
          </div>
        )}
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  perguntas: state.tokenReducer.questions,
  count: state.counterReducer.count,
});

const mapDispatchtoProps = (dispatch) => ({
  counterF: () => dispatch(counter()),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Answers);

Answers.propTypes = {
  perguntas: PropTypes.arrayOf(PropTypes.object).isRequired,
  counterF: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};
