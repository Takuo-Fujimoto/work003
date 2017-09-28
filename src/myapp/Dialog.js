import React, { Component } from 'react';
import dialogCSS from './css/dialog.css';
import dialogWilmaCSS from './css/dialog-wilma.css';
import JuroInput from './JuroInput';
import $ from 'jquery';
import { generateRandomCoordinate } from './Util';
import flipAfuro from './img/flipAfuro2.png';
import Iine from './img/Iine';

class Dialog extends Component {
    constructor() {
        super();
        let styles = {
            popHeader: {
                fontFamily: '"Gochi Hand", cursive, HGMaruGothicMPRO',
                fontSize: '2.1em'
            },
            popMessage: {
                fontFamily: '"Gochi Hand", cursive, HGMaruGothicMPRO',
                whiteSpace: 'nowrap'
            }
        }
        let message = this.getMessage(this.createMessageBox());
        this.state = {
            styles: styles,
            message: message
        };
        this.changeValue = this.changeValue.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    createMessageBox() {
        let messageBox = [];
        messageBox.push('Love the life you live. Live the life you love.');
        messageBox.push('Everything is practice.');
        messageBox.push('Without haste, but without rest.');
        messageBox.push('Drive thy business; let it not drive thee.');
        messageBox.push('Thou shouldst eat to live; not live to eat.');
        messageBox.push('Happiness depends upon ourselves.');
        messageBox.push('Imagination means nothing without doing.');
        messageBox.push('Everybody has talent, but ability takes hard work.');
        messageBox.push('Information is not knowledge.');
        messageBox.push('Every day is a new day.');
        messageBox.push('Stay hungry. Stay foolish.');
        messageBox.push('Everything you can imagine is real.');
        return messageBox;
    }
    getMessage(messageBox) {
        return messageBox[generateRandomCoordinate(messageBox.length - 1)];
    }

    startGame() {
        this.props.startGame();
    }

    changeValue(id, value) {
        this.props.changeValue(id, value);
    }
    componentDidMount() { }
    componentWillUnmount() { }
    startDialogClick(e) {
        $('#somedialog').data('clickPointX', e.pageX - $('#somedialog').offset().left).data('clickPointY', e.pageY - $('#somedialog').offset().top);
        $(document).mousemove(function (e) {
            $("#somedialog").css({
                top: e.pageY - $("#somedialog").data("clickPointY") + "px",
                left: e.pageX - $("#somedialog").data("clickPointX") + "px"
            });
        });
    }
    endDialogClick(e) {
        $(document).unbind("mousemove");
    }
    onClickHideButton(e) {
        if (this.props.onClickHideFunction) {
            this.props.onClickHideFunction();
        }
    }
    render() {
        let animationName = 'dialog dialog--open animatedDelay ' + this.props.animationName;
        let dialogHeight = window.innerHeight > 600 ? 440 : window.innerHeight * 0.82;
        let message = this.state.message;
        let floatingIcon = {
            zIndex: '10',
            width: '50px',
            height: '50px',
            cursor: 'pointer'
        };
        return (
            <div id='somedialog' className={animationName} style={{ height: dialogHeight + 'px' }}>
                <div className='dialog__content'>
                    <div className='morph-shape'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 560 280' preserveAspectRatio='none'>
                            <rect x='3' y='3' fill='none' width='556' height='276' rx='5' ry='5' />
                        </svg>
                    </div>
                    <div className='dialogHeader' onMouseDown={this.startDialogClick} onMouseUp={this.endDialogClick}>
                        <span style={this.state.styles.popHeader}>GAME Settings</span>
                    </div>
                    <div className='dialog-inner'>
                        <div id='messageArea' style={{ height: dialogHeight * 0.8 + 'px' }} className='flexbox'>
                            <div style={{
                                position: 'relative',
                                textAlign: 'left'
                            }}>
                                <img src={flipAfuro}></img>
                                <div style={{
                                    position: 'absolute',
                                    top: '120px',
                                    left: '50px',
                                    width: '300px',
                                    margin: '0',
                                    padding: '0'
                                }}>{message}</div>
                            </div>
                            <div className='flexbox'>
                                <JuroInput id='yCount' onChange={this.changeValue}
                                    type='number' disabled='' label='たてのかず'
                                    pattern='[1-9][0-9]*' />
                                <JuroInput id='xCount' onChange={this.changeValue}
                                    type='number' disabled='' label='よこのかず'
                                    pattern='[1-9][0-9]*' />
                                <JuroInput id='mineCount' onChange={this.changeValue}
                                    type='number' disabled='' label='BOMBのかず'
                                    pattern='[1-9][0-9]*' />
                            </div>
                        </div>
                        <span onClick={this.startGame}>
                            <Iine id='startButton' style={floatingIcon} color={{
                                fill: 'deeppink'
                            }} /></span>
                    </div>
                </div>
            </div >
        );
    }
}
export default Dialog;


/*
Love the life you live. Live the life you love.
-　Bob Marley　（ボブ・マーリー）　-
自分の生きる人生を愛せ。自分の愛する人生を生きろ。

Everything is practice.
-　Pele　（ペレ）　
すべては練習のなかにある。

Without haste, but without rest.
-　Johann Wolfgang von Goethe　（ゲーテ）　-
急がずに、だが休まずに。

Drive thy business; let it not drive thee.
-　Benjamin Franklin　（ベンジャミン・フランクリン）　-
仕事を追い立てよ。仕事に追い立てられてはならない。

Thou shouldst eat to live; not live to eat.
-　Socrates　（ソクラテス）　-
生きるために食べよ、食べるために生きるな。

Happiness depends upon ourselves.
-　Aristotle　（アリストテレス）　-
幸せかどうかは、自分次第である。

Imagination means nothing without doing.
-　Charlie Chaplin　（チャップリン）　-
行動を伴わない想像力は、何の意味も持たない。

Everybody has talent, but ability takes hard work.
-　Michael Jordan　（マイケル・ジョーダン）　-
誰もが才能を持っている。でも能力を得るには努力が必要だ。

Information is not knowledge.
-　Albert Einstein　（アインシュタイン）　-
情報は知識にあらず。

Every day is a new day.
-　Ernest Hemingway　（ヘミングウェイ）　-
とにかく、新しい毎日なんだ。

Stay hungry. Stay foolish.
-　Steve Jobs　（スティーブ・ジョブズ）　-
ハングリーであれ。愚か者であれ。

Everything you can imagine is real.
-　Pablo Picasso　（パブロ・ピカソ）　-
想像できることは、すべて現実なのだ。







*/
