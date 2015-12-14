import React, {Component} from 'react';
import subschema, {loaderFactory,types,PropTypes, DefaultLoader, ValueManager} from 'subschema';
import defaults from 'lodash/object/defaults';

var {Checkbox, Text} = types;

export default class InputFalse extends Component {

    //allows for injection of the Select types.
    static propTypes = defaults({
        onChange: PropTypes.valueEvent
    }, Text.propTypes);

    handleChange = (checked)=> {
        if (checked === false) {
            this.props.onChange(false);
        } else if (checked === true) {
            this.props.onChange(null);
        }
    }
    handleText = (e)=> {
        this.props.onChange(e.target.value);
    }
    //inline styles, because this is an example
    render() {
        var {value,  onChange, ...props} = this.props;

        return <div>
            <Checkbox className='' checked={value !== false}
                      style={{position: 'absolute',  left:'-5px', top:'5px'}}
                      onChange={this.handleChange}/>
            <Text {...props} onChange={this.handleText} value={value === false ? '' : value}
                             disabled={value === false}/>
        </div>
    }
}
