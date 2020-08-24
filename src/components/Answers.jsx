import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { counter } from '../actions';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      isAssertion: false,
      assertion: 0,
      timer: 30,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.clickC = this.clickC.bind(this);
    this.clickI = this.clickI.bind(this);
  }
  
  componentDidMount() {
    this.intervalChange();
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
      this.timeOut();
    }, 1000);
  }

  // prettier-ignore
  nextQuestion() {
    const { counterF } = this.props;
    this.setState({ isClicked: false });
    counterF();
    clearInterval(this.myInterval);
    this.intervalChange();
  }

  // prettier-ignore
  clickC() {
    this.setState({ isClicked: true, assertion: this.state.assertion + 1 });
    // console.log(this.state.assertion)
  }

  // prettier-ignore
  clickI() {
    this.setState({ isClicked: true });
    // console.log(this.state.assertion)
  }

  timeOut() {
    if (this.state.timer === 0) {
      this.setState({ isClicked: true });
    }
  }
  

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
