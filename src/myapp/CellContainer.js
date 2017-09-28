import React, { Component } from 'react';
import Cell from './Cell';
import sunFlower from './img/sunFlower.jpg';

class CellContainer extends Component {

    constructor(props) {
        console.log(' CellContainer constructor');
        super(props);
        this.state = {
            isGameOver: false,
            aroundBomCount: {},
            countTargetCells: [],
            openCells: [],
            cellCount: this.props.xCount * this.props.yCount,
            isClear: false,
            isReplayHover: false
        };
        let mineCoordinate = this.setUpMine();
        this.state.mineCoordinate = mineCoordinate;
        this.bomber = this.bomber.bind(this);
        this.countAroundBoms = this.countAroundBoms.bind(this);
        this.onEnterForMessageChange = this.onEnterForMessageChange.bind(this);
        this.onLeaveForMessageChange = this.onLeaveForMessageChange.bind(this);
    }

    calcWidth() {
        // 右のBar(50)込
        let windowWidth = window.innerWidth - 60;
        let cellWidth = windowWidth / this.props.xCount;
        if (cellWidth < 15) {
            cellWidth = 15
        }
        let windowHeight = window.innerHeight - 30;
        let cellHeight = windowHeight / this.props.yCount;
        if (cellHeight < 15) {
            cellHeight = 15
        }
        return cellWidth < cellHeight ? cellWidth : cellHeight;
    }

    setUpMine() {
        let mineCoordinate = [];
        let multiplyXY = (Number(this.props.yCount) * Number(this.props.xCount));
        let mineCount = this.props.mineCount < multiplyXY ? this.props.mineCount : multiplyXY;
        for (let mineCounter = 0; mineCounter < mineCount;) {
            let xCoordinate = this.generateRandomNumber(this.props.xCount);
            let yCoordinate = this.generateRandomNumber(this.props.yCount);
            // 重複判定
            if (mineCoordinate.includes(xCoordinate + '-' + yCoordinate)) {
                continue;
            }
            mineCoordinate.push(xCoordinate + '-' + yCoordinate);
            mineCounter++;
            // BOM周辺セルにBOM数追加
            let startX = Number(xCoordinate) == 1 ? 1 : Number(xCoordinate) - 1;
            let countXcells = Number(xCoordinate) == 1 ? 2 : 3;
            let startY = Number(yCoordinate) == 1 ? 1 : Number(yCoordinate) - 1;
            let countYcells = Number(yCoordinate) == 1 ? 2 : 3;
            let i = 0;
            let j = 0;
            for (; i < countXcells; i++) {
                let tempX = Number(startX) + Number(i);
                if (tempX > Number(this.props.xCount)) {
                    continue;
                }
                j = 0;
                for (; j < countYcells; j++) {
                    let tempY = Number(startY) + Number(j);
                    if (tempY > Number(this.props.yCount) || xCoordinate + '-' + yCoordinate == tempX + '-' + tempY) {
                        continue;
                    }
                    if (typeof this.state.aroundBomCount[tempX + '-' + tempY] === "undefined") {
                        this.state.aroundBomCount[tempX + '-' + tempY] = 1;
                    } else {
                        this.state.aroundBomCount[tempX + '-' + tempY]
                            = this.state.aroundBomCount[tempX + '-' + tempY] + 1;
                    }
                }
            }
        }
        return mineCoordinate;
    }

    generateRandomNumber(maxNumber) {
        // randomは0.0以上1.0未満までのランダムな浮動小数点を得る
        let randomValue = Math.random();
        // 乱数を、横か縦のマスの数に変換する
        // 具体的には0.0～0.99999…をマスの数で分割するイメージ　実際には乱数にマス数をかけて切り上げる
        return Math.ceil(randomValue * maxNumber);
    }

    bomber(x, y) {
        this.setState({ isGameOver: true });
        this.props.endFunction();
    }

    countAroundBoms(x, y) {
        let cofficient = 5;
        if (this.state.cellCount > 3000) {
            cofficient = 100;
        } else if (this.state.cellCount > 2000) {
            cofficient = 40;
        } else if (this.state.cellCount > 1000) {
            cofficient = 20;
        } else if (this.state.cofficient > 500) {
            cofficient = 10;
        }
        let openRange = this.generateRandomNumber(cofficient);
        let startX = Number(x) <= openRange ? 1 : Number(x) - openRange;
        let endX = Number(x) + openRange > Number(this.props.xCount) ? Number(this.props.xCount) :
            Number(x) + openRange;
        let startY = Number(y) <= openRange ? 1 : Number(y) - openRange;
        let endY = Number(y) + openRange > Number(this.props.yCount) ? Number(this.props.yCount) :
            Number(y) + openRange;
        let isRender = false;
        for (let i = startX; i <= endX; i++) {
            for (let j = startY; j <= endY; j++) {
                if (x == i && y == j) {
                    if (!this.state.countTargetCells.includes(i + '-' + j)) {
                        this.state.countTargetCells.push(i + '-' + j);
                        isRender = true;
                    }
                    continue;
                }
                if (this.state.countTargetCells.includes(i + '-' + j)) {
                    continue;
                }
                this.state.countTargetCells.push(i + '-' + j);
                if (i == startX || i == endX || j == startY || j == endY) {
                    // console.log('isRender = true : ' + i + '-' + j)
                    isRender = true;
                }
            }
        }
        // this.countAroundBomsRec(x, y);
        if (isRender) {
            this.forceUpdate();
        }
    }

    onEnterForMessageChange() {
        this.setState({ isReplayHover: true });
    }

    onLeaveForMessageChange() {
        this.setState({ isReplayHover: false });
    }

    render() {
        // console.log('cellContainer Render ');
        let cellWidth = this.calcWidth();
        let rows = [];
        let openCellCount = 0;
        for (let yIndex = 1; yIndex < Number(this.props.yCount) + 1; yIndex++) {
            let row = [];
            for (let xIndex = 1; xIndex < Number(this.props.xCount) + 1; xIndex++) {
                let bomCount = this.state.aroundBomCount[xIndex + '-' + yIndex];
                if (this.state.mineCoordinate.includes(xIndex + '-' + yIndex)) {
                    row.push((<Cell cellWidth={cellWidth} isBom={true}
                        clickFunction={this.bomber}
                        isGameOver={this.state.isGameOver}
                        x={xIndex}
                        y={yIndex}
                        bomCount={bomCount}
                        updateFlagFunction={this.props.updateFlagFunction} />));
                } else {
                    let isOpen = this.state.countTargetCells.includes(xIndex + '-' + yIndex);
                    let isOpenAround = false;
                    if (isOpen) {
                        openCellCount++;
                        // console.log('isOpenAndCountBom true : ' + xIndex + '-' + yIndex);
                        if (!this.state.openCells.includes(xIndex + '-' + yIndex)) {
                            this.state.openCells.push(xIndex + '-' + yIndex);
                            isOpenAround = true;
                        }
                    }
                    row.push((<Cell cellWidth={cellWidth}
                        isGameOver={this.state.isGameOver}
                        clickFunction={this.countAroundBoms}
                        x={xIndex}
                        y={yIndex}
                        bomCount={bomCount}
                        updateFlagFunction={this.props.updateFlagFunction}
                        isOpen={isOpen}
                        isOpenAround={isOpenAround} />));
                }
            }
            rows.push(<div style={{ display: 'flex', height: cellWidth + 'px' }}>{row}</div>);
        }
        // 開けられるセルを全て開いた　⇒　Clear
        if (!this.props.isEnd && openCellCount + this.state.mineCoordinate.length == this.state.cellCount) {
            setTimeout(function () {
                this.setState({ isClear: true });
                this.props.endFunction();
            }.bind(this), 1000);
        }
        if (this.state.isClear) {
            let message = 'CongraturationS!!!';
            let color = '#00F';
            if (this.state.isReplayHover) {
                message = 'Replay?';
                color = 'red';
            }
            return (<div style={{
                width: 'calc(100% - 50px)',
                height: 'calc(100%)',
                backgroundImage: `url(${sunFlower})`,
                backgroundSize: 'cover'
            }} >
                <div style={{
                    position: 'absolute',
                    top: '70px',
                    left: '50px',
                    width: '9em',
                    margin: '0',
                    padding: '0',
                    fontSize: '100px',
                    fontFamily: '"Gochi Hand", cursive, HGMaruGothicMPRO',
                    color: '#FFF',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    textShadow: '2px 2px 1px ' + color
                    + ', -2px 2px 1px ' + color
                    + ', 2px -2px 1px ' + color
                    + ', -2px -2px 1px ' + color,
                    cursor: 'pointer'
                }} onClick={this.props.replay}
                    onMouseEnter={this.onEnterForMessageChange}
                    onMouseLeave={this.onLeaveForMessageChange}>{message}</div>

            </div>);
        } else {
            return (
                <div style={{
                    width: 'calc(100% - 60px)',
                    height: 'calc(100% - 10px)',
                    borderColor: '#5c3bff',
                    borderStyle: 'outset',
                    borderWidth: '5px',
                    overflow: 'scroll'
                }}>
                    {rows}
                </div>);
        }
    }
};

export default CellContainer;
