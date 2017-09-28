import React, { Component } from 'react';
import bom from './img/bom.png';

class MineInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <div style={{
                width: '40px',
                height: '40px',
                margin: '30px 5px 0px',
                backgroundImage: `url(${bom})`,
                backgroundSize: 'contain'
            }} />
            <div style={{
                fontFamily: 'fantasy',
                color: '#FFF',
                fontWeight: 'bold',
                textShadow: '2px 2px 1px #00F, -2px 2px 1px #00F, 2px -2px 1px #00F, -2px -2px 1px #00F'
            }}>{this.props.mineCount}</div>
        </div>);
    }

}
export default MineInfo;