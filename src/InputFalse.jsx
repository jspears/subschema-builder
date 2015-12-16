import React, {Component} from 'react';
import subschema, {loaderFactory,types,PropTypes, DefaultLoader, ValueManager} from 'Subschema';
import defaults from 'lodash/object/defaults';

var {Checkbox, Text} = types;

export default class InputFalse extends Component {

    //allows for injection of the Select types.
    static propTypes = defaults({
        onChange: PropTypes.valueEvent,
        defaultValue: PropTypes.string
    }, Text.propTypes);

    handleChange = (checked)=> {
        this.props.onChange(!checked ? false : this.lastValue);

    }
    handleText = (e)=> {
        if (this.props.defaultValue === e.target.value) {
            this.props.onChange(void(0));
        } else {
            this.lastValue = e.target.value;
            this.props.onChange(e.target.value);
        }
    }
    //inline styles, because this is an example
    render() {
        var {value, defaultValue, onChange, ...props} = this.props;
        var checked = value !== false;
        value = value === false || value == null ? this.lastValue || defaultValue : value;
        return <div>
            <Checkbox className='' checked={checked}
                      style={{position: 'absolute',  left:'-5px', top:'5px'}}
                      onChange={this.handleChange}/>
            <Text {...props} onChange={this.handleText} value={value}
                             disabled={!checked}/>
        </div>
    }
}
