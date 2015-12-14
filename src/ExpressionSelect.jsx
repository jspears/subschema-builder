import React, {Component} from 'react';
import subschema, {loaderFactory,types, tutils, decorators, PropTypes, DefaultLoader, ValueManager} from 'subschema';
import defaults from 'lodash/object/defaults';
var {isString, toArray} = tutils;
var {Select, Checkbox} = types;
var {listeners} = decorators;

function toLabelVal(v) {
    if (isString(v)) {
        return {
            label: v,
            val: v
        }
    }
    var {label, key} = v;
    if (!label) {
        label = key;
    }
    if (!key) {
        key = label;
    }
    return {
        label, key
    }

}

export default class ExpressionSelect extends Component {

    //allows for injection of the Select types.
    static propTypes = defaults({
        optionsPath: PropTypes.string
    }, Select.propTypes);

    constructor(...props) {
        super(...props);
        this.state || (this.state = {});
    }

    @listeners("value", true)
    listenTo() {
        if (!this.props.optionsPath) {
            return null;
        }
        return {
            [this.props.optionsPath]: 'changeOptions'
        }
    }

    changeOptions(options) {
        this.setState({
            options: toArray(options).map(toLabelVal)
        })
    }

    //inline styles, because this is an example
    render() {
        var {options, ...props} = this.props;
        return <Select {...props} options={this.state.options || options}/>
    }
}
