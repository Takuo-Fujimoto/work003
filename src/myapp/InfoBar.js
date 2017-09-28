import React, { Component } from 'react';
import Timer from './Timer';
import MineInfo from './MineInfo';
import FlagInfo from './FlagInfo';

class InfoBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barStyle: {
                width: '50px',
                height: '100%',
                backgroundColor: '#000000',
                position: 'absolute',
                top: '0',
                right: '0'
            }
        };
    }

    render() {
        return (<div style={this.state.barStyle}>
            <Timer isEnd={this.props.isEnd}/>
            <MineInfo mineCount={this.props.mineCount}/>
            <FlagInfo flagCount={this.props.flagCount}/>
        </div>);
    }

}
export default InfoBar;