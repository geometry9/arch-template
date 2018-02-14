import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  question: PropTypes.string
};

class Question extends Component {
  render() {
    return (
      <div className="question">
        { this.props.question }
      </div>
    );
  }
}

Question.propTypes = propTypes;
export default Question;
