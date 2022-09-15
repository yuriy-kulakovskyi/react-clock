import React from 'react';
import './Clock.css';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.circle = React.createRef();
    this.dot = React.createRef();
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        if (this.state.date.getHours() < 10) {
          document.querySelector(".hoursZero").style.display = 'block';
        } else {
          document.querySelector(".hoursZero").style.display = 'none';
        }

        if (this.state.date.getMinutes() < 10) {
          document.querySelector(".minutesZero").style.display = 'block';
        } else {
          document.querySelector(".minutesZero").style.display = 'none';
        }

        this.circle.current.setAttribute("stroke-dashoffset", 848 - (848 * this.state.date.getSeconds()) / 60);
        this.dot.current.style.transform = `rotate(${this.state.date.getSeconds() * 6}deg)`;

        this.tick();
      },
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }


  render() {
    return (
      <div className='clock-wrapper'>
        <header className="clock-wrapper__header">
          <h2 className="clock-wrapper__header__title">clock</h2>
          <h4 className="clock-wrapper__header__subtitle">pacific time</h4>
        </header>
        <main className="clock-wrapper__main">
          <div className="clock-wrapper__main__circle">
            <div className="clock-wrapper__main__circle__dot" ref={this.dot}></div>
            <svg className="clock-wrapper__main__circle__svg">
              <circle cx={138} cy={139} r={135}></circle>
              <circle cx={138} cy={139} r={135} strokeDasharray={848} ref={this.circle}></circle>
            </svg>
            <h2 className='clock-wrapper__main__circle__time'> <span className='zero hoursZero'>0</span>{this.state.date.getHours()} <span className='dots'>:</span> <span className="zero minutesZero">0</span>{this.state.date.getMinutes()}</h2>
          </div>
        </main>
      </div>
    );
  }
}
 
export default Clock;