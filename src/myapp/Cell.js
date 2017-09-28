import React, { Component } from 'react';
import flag from './img/flag.png';
import bom from './img/bom.png';

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayStatus: '0', // 0:無印, 1:フラグ, 2:?マーク
            isOpen: false,
            inDivStyle: {
                backgroundColor: '#e6eae3',
                width: this.props.cellWidth - 3 + 'px',
                height: this.props.cellWidth - 3 + 'px',
                // position: 'absolute',
                borderRadius: '3px',
                margin: '1.5px',
                verticalAlign: 'middle'
            },
            inDivSizeStyle: {
                width: this.props.cellWidth - 3 + 'px',
                height: this.props.cellWidth - 3 + 'px',
                margin: '1.5px'
            },
            outDivStyle: {
                backgroundColor: '#524748',
                width: this.props.cellWidth + 'px',
                height: this.props.cellWidth + 'px',
                position: 'relative',
                borderRadius: '3px'
            }
        };
        this.changeDisplayStatus = this.changeDisplayStatus.bind(this);
        this.preventContextMenu = this.preventContextMenu.bind(this);
        this.open = this.open.bind(this);
    }

    changeDisplayStatus(e) {
        e.preventDefault();
        if (this.props.isGameOver) {
            return;
        }
        if (this.state.displayStatus === '0') {
            this.setState({ displayStatus: '1' });
            this.props.updateFlagFunction(1);
        } else if (this.state.displayStatus === '1') {
            this.setState({ displayStatus: '2' });
            this.props.updateFlagFunction(-1);
        } else {
            this.setState({ displayStatus: '0' });
        }
    }

    preventContextMenu(e) {
        e.preventDefault();
        if (this.props.isGameOver) {
            return;
        }
    }

    open(e) {
        // console.log(this.props.x + '-' + this.props.y);
        if (this.props.isGameOver) {
            return;
        }
        if (!this.state.isOpen) {
            this.setState({ isOpen: true });
        }
        if (this.props.clickFunction) {
            this.props.clickFunction(this.props.x, this.props.y);
        }
    }

    render() {
        // console.log('cell Render ' + this.props.x + ' - ' + this.props.y);
        if (this.props.isGameOver || this.state.isOpen // これは酷い
            || this.props.isOpen) {
            if (this.state.displayStatus === '1') {
                // うまく動かないコード
                // Flagの数はコンテナで数えないと、正確な数はわからない。
                // 非同期でrenderが走っているので、排他をかけていないのでFieldのflagCountにうまく加算・減算されない
                this.props.updateFlagFunction(-1);
                this.setState({ displayStatus: '0' });
            }
            if (this.props.isBom) {
                return <div style={this.state.outDivStyle} onContextMenu={this.preventContextMenu}
                    id={this.props.coordinate}>
                    <div style={{
                        ...this.state.inDivSizeStyle,
                        ...{
                            backgroundImage: `url(${bom})`,
                            backgroundSize: 'contain'
                        }
                    }} >
                    </div>
                </div>;
            } else if (this.props.bomCount >= 1) {
                let bomCountSpan = this.props.bomCount ? (<span style={{ color: 'white' }}>{this.props.bomCount}</span>) : (<span />);
                return <div style={this.state.outDivStyle} onContextMenu={this.preventContextMenu}
                    id={this.props.coordinate}>
                    <div style={this.state.inDivSizeStyle}>
                        {bomCountSpan}
                    </div>
                </div>;
            } else {
                if (this.props.isOpenAround) {
                    setTimeout(function () { this.props.clickFunction(this.props.x, this.props.y) }.bind(this),
                        1);
                }
                return <div style={this.state.outDivStyle} onContextMenu={this.preventContextMenu}
                    id={this.props.coordinate}>
                    <div style={this.state.inDivSizeStyle}>
                    </div>
                </div>;
            }
        } else {
            if (this.state.displayStatus === '1') {
                return (
                    <div style={this.state.outDivStyle} onContextMenu={this.changeDisplayStatus}
                        id={this.props.coordinate}>
                        <div style={{
                            ...this.state.inDivStyle,
                            ...{
                                backgroundImage: `url(${flag})`,
                                backgroundSize: 'contain'
                            }
                        }} >
                        </div>
                    </div>);
            } else if (this.state.displayStatus === '2') {
                return (
                    <div style={this.state.outDivStyle} onContextMenu={this.changeDisplayStatus}
                        id={this.props.coordinate}>
                        <div style={this.state.inDivStyle} >
                            <span>?</span>
                        </div>
                    </div>);
            } else {
                return (
                    <div style={this.state.outDivStyle}
                        onClick={this.open}
                        onContextMenu={this.changeDisplayStatus}
                        id={this.props.coordinate}>
                        <div style={this.state.inDivStyle} >
                        </div>
                    </div>);
            }
        }
    }
};

export default Cell;
