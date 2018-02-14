import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
  results: PropTypes.object
};

class Results extends Component {
  contructor(props){
    super(props);
  }

  render() {
    return (
      <div className="results">

      </div>
    );
  }
}

Results.propTypes = propTypes;
export default Results;
