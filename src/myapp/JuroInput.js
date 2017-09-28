import React, { Component } from 'react';
import TextInputEffectsCSS from './css/TextInputEffects.css';

/**
 * JuroInput.
 * @param id
 * @param value
 * @param onChange
 * @param labelBackColor
 * @param type
 * @param disabled
 * @param label
 */
class JuroInput extends Component {
    constructor() {
        super();
        this.state = { focus: false };
        this.onBlurInput = this.onBlurInput.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.changeText = this.changeText.bind(this);
        this.onFocusInput = this.onFocusInput.bind(this);
        this.isNumber = this.isNumber.bind(this);
    }

    componentWillMount() {
        let stateObj = {};
        if (this.props.value) {
            stateObj[this.props.id] = this.props.value;
            this.setState(stateObj);
            if (this.props.onChange) {
                this.props.onChange(this.props.id, this.props.value);
            }
        }
    }

    onBlurInput(e) {
        this.setState({ focus: false });
    }
    changeText(e) {
        // 半角のみを入力させたい場合。　全角数値の場合、e.target.valueはブランク（確定してない段階でこれが走る）
        if (!e.target.value && !this.props.enableZenkaku) {
            // stateを更新しないのと，renderを走らせる。renderでDOM上のvalueも消し飛ばす
            // reactの世界にvalueは入らなくても、入力してる値がDOM上にはいってしまっている。
            this.forceUpdate();
            return;
        }
        if (this.props.type == 'number' && this.isNumber(e.target.value)) {
            // e.preventDefault();
            this.forceUpdate();
            // 
            return;
        }
        var stateObject = function () {
            let returnObj = {};
            returnObj[this.target.id] = this.target.value;
            return returnObj;
        }.bind(e)();
        this.setState(stateObject);
        if (this.props.onChange) {
            this.props.onChange(e.target.id, e.target.value);
        }
    }
    isNumber(value) {
        return typeof value === 'number' && isFinite(value);
    }
    onFocusInput() {
        this.setState({ focus: true });
    }

    render() {
        let containerClassName = 'containerJuro';
        let contentStyle = {};
        // 文字を入力するときに、枠になる（ラベルの背景）領域のスタイル
        let fillTextWakuStyle = {};
        if (this.state.isFilled || (this.state[this.props.id] && this.state[this.props.id].trim() !== '') || (document.getElementById(this.props.id) && document.getElementById(this.props.id).value !== '')) {
            containerClassName = containerClassName + ' inputJurofilled';
            contentStyle.paddingTop = '1.5em';
            fillTextWakuStyle.borderColor = this.props.labelBackColor
                ? this.props.labelBackColor
                : '#f6ae54';
        } else {
            if (this.state.focus) {
                contentStyle.paddingTop = '1.5em';
                fillTextWakuStyle.borderColor = this.props.labelBackColor
                    ? this.props.labelBackColor
                    : '#f6ae54';
            } else {
                contentStyle.paddingTop = '1em';
            }
        }
        let labelStyle = this.props.disabled === 'disabled'
            ? {
                backgroundColor: '#f7b977'
            }
            : {
                backgroundColor: '#fff'
            };
        let inputStyle = this.props.disabled === 'disabled'
            ? {
                color: '#667c00'
            }
            : {
                color: '#1784cd'
            };

        let inputComponent;
        if (this.props.type === 'select') {
            let options = this.props.options.map(function (optionData) {
                return (
                    <option value={optionData.value}>{optionData.label}</option>
                );
            });
            inputComponent = (
                <select className='inputJuro' id={this.props.id} value={this.state[this.props.id]}
                    disabled={this.props.disabled} onChange={this.changeText} style={inputStyle}
                    onFocus={this.onFocusInput} onBlur={this.onBlurInput}>
                    {options}
                </select>
            )
        } else {
            // 苦しい。
            let value = this.state[this.props.id] ? this.state[this.props.id] : '';
            if (!value && document.getElementById(this.props.id)) {
                document.getElementById(this.props.id).value = '';
            }
            inputComponent = (<input className='inputJuro' type={this.props.type} pattern={this.props.pattern}
                id={this.props.id} value={value} disabled={this.props.disabled}
                onChange={this.changeText} style={inputStyle} onFocus={this.onFocusInput}
                onBlur={this.onBlurInput} />)
        }
        return (
            <span className={containerClassName}>
                {inputComponent}
                <label className='labelJuro' htmlFor={this.props.id} style={labelStyle}>
                    <div className='labelBefore' style={fillTextWakuStyle} />
                    <span className='contentJuro' style={contentStyle}>{this.props.label}</span>
                </label>
            </span>
        );
    }
}

export default JuroInput;
