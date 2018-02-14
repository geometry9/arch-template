import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const propTypes = {
  answers: PropTypes.array,
  onSelect: PropTypes.func,
};

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  renderAnswers() {
    const { answers, onSelect } = this.props;
    const { loading } = this.state;
    const classes = `answer button is-link ${loading ? 'is-loading' : ''}`;

    return answers.map((answer, key) =>
      (<button
        className={classes}
        disabled={(loading) ? true : false}
        key={key}
        onClick={() => {
          this.setState({ loading: true });
          onSelect(answer);
        }}
      >
        {answer}
      </button>)
    );
  }

  render() {
    return (
      <div className="answers">
        { this.renderAnswers() }
      </div>
    );
  }
}

Answers.propTypes = propTypes;
export default Answers;
