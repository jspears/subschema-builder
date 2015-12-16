import React, {Component} from 'react';
import Subschema, {PropTypes, templates,  tutils, types} from 'Subschema';

var {Checkbox} = types;
var {ButtonsTemplate} = templates;
var {noop} = tutils;

export default class ToggleTemplate extends Component {
    static propTypes = {
        buttons: PropTypes.buttons,
        legend: PropTypes.string.isRequired,
        expand: PropTypes.bool,
        className: PropTypes.cssClass,
        onButtonClick: PropTypes.event,
        onClick: PropTypes.event
    }

    static defaultProps = {
        expand: false
    }

    constructor(props, ...args) {
        super(props, ...args);
        this.state = {
            expand: props.expand
        }
    }

    componentWillReceiveProps(props) {
        if (props.expand != this.props.expand) {
            this.setState({expand: props.expand});
        }
    }

    handleToggle = (e)=> {
        e && e.preventDefault();
        e && e.stopPropagation();
        this.setState({expand: !this.state.expand});
    };


    renderButtons(buttons) {
        if (!buttons) {
            return null;
        }
        if (buttons.buttons) {
            return <ButtonsTemplate onButtonClick={this.props.onButtonClick} onClick={this.props.onClick}
                {...buttons}/>
        }
        return <ButtonsTemplate onButtonClick={this.props.onButtonClick} onClick={this.props.onClick}
                                buttons={buttons}/>
    }

    render() {
        var {legend, buttons, className, ...rest} = this.props.field || {};
        return <fieldset className={className} key='fieldset'>
            <legend className='clickable' onClick={this.handleToggle}>{legend}</legend>
            {this.state.expand ? this.props.children : null}
            {this.state.expand ? this.renderButtons(buttons) :null}
        </fieldset>
    }
}