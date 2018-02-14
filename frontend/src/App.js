import React, { Component } from 'react';
import Question from './components/question';
import Answers from './components/answers';
import axios from 'axios';
import { API_ENDPOINT } from './config';
import { VictoryPie } from 'victory-pie';
import 'bulma/css/bulma.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      submitted: false,
      poll: {
        question: 'Am i the default question?',
        answers: [ 'answer 1', 'answer 2', 'answer 3']
      },
      pieData: null,
      error: false,
    };
  }
  componentWillMount(){
    this.fetchPoll();
  }

  fetchPoll(){
    axios.get(`${API_ENDPOINT}/api/getRandomQuestion`)
      .then((response) => this.setState({ poll: response.data.data[0] }))
      .catch((error) => this.setState({ error: error }));
  }

  postPoll(answer){
    const dataLoad = {
      id: this.state.poll.id,
      answer: answer,
    };

    axios.post(`${API_ENDPOINT}/api/updateAnswerQty`, dataLoad)
      .then((response) => {
        const answers = response.data.data.answers;
        const preparedData = Object.keys(answers).map((val)=> {
          return { x: val, y: answers[val] };
        });
        // Have a quick response without it being too immediate.
        setTimeout(() =>
          (this.setState({ submitted: true, pieData: preparedData }), 1000));
      })
      .catch((error) => this.setState({ error: error }));
    return answer;
  }

  render() {
    const { poll, submitted, pieData, error } = this.state;
    return (
      <div className="App">
        <section className="hero is-primary has-text-centered">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <Question question={poll.question} />
              </h1>
            </div>
          </div>
        </section>
        { (!submitted) ?
          <section className="section">
            <div className="container">
              <Answers
                answers={Object.keys(poll.answers)}
                onSelect={(answer) => this.postPoll(answer)}
              />
            </div>
          </section>
          :
          <section className="section">
            <div className="container pie">
              <h2>This is how most people answered</h2>
              <VictoryPie
                animate={{ duration: 4000 }}
                colorScale={['tomato', 'gold', 'cyan', 'navy']}
                labels={(d) => `${d.y} - ${d.x}`}
                data={pieData}
              />
            </div>
          </section>
        }
        { (error) ?
          <div className="notification is-danger">
            <button className="delete"></button>
            { error }
          </div>
          : ''
        }

      </div>
    );
  }
}

export default App;
