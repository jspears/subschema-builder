"use strict";
import React, {Component, Children} from 'react';
import Subschema, {templates, PropTypes, styles, types,  decorators} from 'Subschema';

var mstyles = styles.ModalTemplate;
var { ButtonsTemplate} = templates;
var {listen} = decorators;

export default class ModalCreateTemplate extends Component {
    static contextTypes = PropTypes.contextTypes;

    @listen("value", ".key")
    keyName(key) {
        this.setState({key});
    }

    render() {
        var {children, title, ...props} = this.props;
        return <ModalTemplate {...props} title={`${title} Property '${this.state.key}'`}>
            {children}
        </ModalTemplate>
    }
}


class ModalTemplate extends Component {
    static propTypes = {
        onCommit: PropTypes.event,

    };
    static defaultProps = {
        onCommit(){
        }
    }
    handleClose = (e)=> {
        e && e.preventDefault();
    }
    handleBtnClose = (e, action) => {
        switch (action) {
            case 'submit':
            {
                this.props.onSubmit(e);
            }
            case 'close':
            case 'cancel':
                this.handleClose(e);
                break;
        }

    }

    renderFooter(buttons) {
        if (!buttons) return null;
        return <div className={mstyles.footer}><ButtonsTemplate buttons={buttons} onButtonClick={this.handleBtnClose}/>
        </div>
    }

    render() {
        var {title, buttons, path,value, children, ...rest} = this.props;
        return <div className={`${mstyles.namespace} ${mstyles.overlay}`} style={{display:'block'}}>
            <div className={mstyles.backdrop}></div>
            <div className={mstyles.dialog} role="document" style={{zIndex:2000}}>
                <div className={mstyles.content}>
                    <div className={mstyles.header}>
                        <button onClick={this.handleClose} className={mstyles.close} name={this.props.dismiss}
                                value={value}
                                aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4>{title}</h4>
                    </div>
                    <div className={mstyles.body}>
                        {children}
                    </div>
                    {this.renderFooter(buttons)}
                </div>
            </div>
        </div>
    }
}
