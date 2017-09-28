import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: new Date().getTime()
        };
        this.calcDuration = this.calcDuration.bind(this);
    }
    componentDidMount() {
        let intervalFunction = setInterval(this.calcDuration, 1);
        this.setState({intervalFunction: intervalFunction});
    }

    calcDuration() {
        let duration = Math.floor((new Date().getTime() - this.state.startTime) / 1000);
        this.setState({ duration: duration });
    }

    render() {
        if (this.props.isEnd) {
            clearInterval(this.state.intervalFunction);
        }
        return (<div style={{
            color: 'white',
            fontFamily: 'fantasy',
            marginTop: '10px'
        }}>{this.state.duration}</div>);
    }

}
export default Timer;