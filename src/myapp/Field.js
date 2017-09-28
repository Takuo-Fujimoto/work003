import React, { Component } from 'react';
import CellContainer from './CellContainer';
import InfoBar from './InfoBar';
import Dialog from './Dialog';
import './../App.css';
import topImgRed from './img/red.png';
import ribbon from './img/ribbon4.png';
import mineField from './img/mf2.jpg';

class Field extends Component {
    constructor() {
        super();
        let windowWidth = window.innerWidth;
        let logoWidth = windowWidth > 600 ? 300 : windowWidth / 2;
        const styles = {
            logoStyle: {
                width: logoWidth + 'px',
                height: logoWidth * 0.66 + 'px',
                margin: 'auto',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                position: 'absolute',
                cursor: 'pointer'
            }
        }
        this.state = {
            isStart: false,
            isOpenSettings: false,
            styles: styles,
            flagCount: 0
        };
        this.startGame = this.startGame.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.onClickLogo = this.onClickLogo.bind(this);
        this.endGame = this.endGame.bind(this);
        this.updateFlagCount = this.updateFlagCount.bind(this);
        this.replay = this.replay.bind(this);
    }

    replay() {
        this.setState({ flagCount: 0 });
        this.setState({ isStart: false });
        this.setState({ isEnd: false });
        this.setState({ isOpenSettings: false });
    }

    startGame() {
        if (!this.state.yCount || !this.state.xCount || !this.state.mineCount) {
            // メッセージとか、出したいな(割愛)
            return;
        }
        this.setState({ isStart: true });
        this.setState({ isOpenSettings: false });
        // console.log(this.state.xCount + '-' + this.state.yCount);
    }

    onClickLogo(e) {
        this.setState({ isOpenSettings: true });
    }

    changeValue(id, value) {
        let obj = {};
        obj[id] = value;
        this.setState(obj);
    }

    endGame() {
        this.setState({ isEnd: true });
    }

    updateFlagCount(updateCount) {
        console.log(this.state.flagCount + " : " + updateCount);
        this.setState({ flagCount: this.state.flagCount + updateCount });
    }

    render() {
        console.log('Field Render ');
        let yCount = 10;
        let xCount = 10;
        if (this.state.isOpenSettings) {
            return (<div className='App' style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${ribbon})`,
                backgroundSize: 'cover',
                position: 'absolute',
                zIndex: '1'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${ribbon})`,
                    backgroundSize: 'cover',
                    position: 'absolute',
                    zIndex: '2'
                }}>
                    <Dialog animationName='slideInLeft' startGame={this.startGame}
                        changeValue={this.changeValue} />
                    <div onClick={this.onClickLogo}>
                        <img src={topImgRed} style={this.state.styles.logoStyle}
                            onMouseEnter={this.onMouseEnterLogo} onMouseLeave={this.onMouseLeaveLogo} />
                    </div>
                </div>
            </div>);
        } else if (this.state.isStart) {
            return (
                <div className='App' style={{
                    backgroundImage: `url(${mineField})`,
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '100%'
                }}>
                    <CellContainer yCount={this.state.yCount} xCount={this.state.xCount}
                        mineCount={this.state.mineCount} endFunction={this.endGame}
                        updateFlagFunction={this.updateFlagCount}
                        isEnd={this.state.isEnd}
                        replay={this.replay} />
                    <InfoBar
                        flagCount={this.state.flagCount}
                        mineCount={this.state.mineCount}
                        isEnd={this.state.isEnd} />
                </div>
            );
        } else {
            return (
                <div className='App' style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${ribbon})`,
                    backgroundSize: 'cover',
                    position: 'absolute'
                }}>
                    <div onClick={this.onClickLogo}>
                        <img src={topImgRed} style={this.state.styles.logoStyle} className='hoverHighlight'
                        />
                    </div>
                </div>
            );
        }
    }
}

export default Field;