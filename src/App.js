import React from 'react';
import './App.css';

import USA from './USA';
import votes from './votes';

const colors = ['red', 'blue', 'green'];
class App extends React.Component {

  state = {
    reds: 0,
    blues: 0,
    greens: 0,
  };

  changeStateColor = event => {
    this.setState(
      {
        [event.target.id]: colors[
          (colors.indexOf(this.state[event.target.id]) + 1) % colors.length
        ],
      },
      this.calculateVotes,
    );
  };

  calculateVotes = () => {
    let totalReds = 0;
    let totalBlues = 0;
    let totalGreens = 0;

    Object.keys(votes).forEach(key => {
      if (this.state[key] === 'red') {
        totalReds += votes[key];
      } else if (this.state[key] === 'blue') {
        totalBlues += votes[key];
      } else if (this.state[key] === 'green') {
        totalGreens += votes[key];
      }
    });

    this.setState({
      reds: totalReds,
      blues: totalBlues,
      greens: totalGreens,
    });
  };

  render() {
    return (
      <div className="App">
        <USA colors={this.state} onClick={this.changeStateColor} />
        <div className="winner">
          <div><span />{this.state.reds}</div>
          <div><span />{this.state.blues}</div>
          <div><span />{this.state.greens}</div>
        </div>
      </div>
    );
  }
}

export default App;
