import React, { Component } from 'react';
import flag from './img/flag.png';

class FlagInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <div style={{
                width: '40px',
                height: '40px',
                margin: '30px 5px 0px',
                backgroundImage: `url(${flag})`,
                backgroundSize: 'contain'
            }} />
            <div style={{
                fontFamily: 'fantasy',
                color: '#FFF',
                fontWeight: 'bold',
                textShadow: '2px 2px 1px #00F, -2px 2px 1px #00F, 2px -2px 1px #00F, -2px -2px 1px #00F'
            }}>{this.props.flagCount}</div>
        </div>);
    }

}
export default FlagInfo;