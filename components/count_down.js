import React from 'react';

// Counts down from 3, calls props.countDownDone when finished.
export default class CountDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: props.seconds };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        this.setState(prevState => ({
            seconds: prevState.seconds -1
          }));


        // Check if we're past zero.
        if (this.state.seconds == -1) {
            clearInterval(this.timer);
            this.props.countDownDone();
        }
    }

    componentDidMount() {
        this.startTimer()
    }

    render() {
        return (
            // Once timer hits 0 show 'go!' instead 
            <div>
                {this.state.seconds <= 0 ? this.props.finished :  this.state.seconds}
            </div>
        );
    }
}
