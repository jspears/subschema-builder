import React, {Component} from 'react';
import subschema, {loaderFactory,types, DefaultLoader, ValueManager} from 'subschema';
import ExpressionSelect from './ExpressionSelect.jsx';
var {Checkbox} = types;

export default class SelectDefault extends Component {

    //allows for injection of the Select types.
    static propTypes = ExpressionSelect.propTypes;

    handleChange = (checked)=> {
        if (checked === false) {
            this.props.onChange(false);
        } else if (checked === true) {
            this.props.onChange(null);
        }
    }
    //inline styles, because this is an example
    render() {
        var {value, ...props} = this.props;

        return <div>
            <Checkbox className='' checked={value !== false}
                      style={{position: 'absolute',  left:'-5px', top:'5px'}}
                      onChange={this.handleChange}/>
            <ExpressionSelect {...props} value={value === false ? null : value} disabled={value === false}/>
        </div>
    }
}
