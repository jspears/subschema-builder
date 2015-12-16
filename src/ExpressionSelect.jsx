import React, {Component} from 'react';
import subschema, {loaderFactory,types, tutils, decorators, PropTypes, DefaultLoader, ValueManager} from 'Subschema';
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
        optionsPath: PropTypes.string,
        defaultValue: PropTypes.string,
        emptyIfDefault: PropTypes.bool
    }, Select.propTypes);

    constructor(...props) {
        super(...props);
        this.state || (this.state = {});
    }

    componentWillMount() {
        this.setup(this.props);
    }

    componentWillRecieveProps(props) {
        this.setup(props);
    }

    setup(props) {
        if (props.emptyIfDefault === false && props.value == null) {
            props.onChange(this.props.defaultValue);
        }
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

    //default values should not be populated.
    handleChange = (e)=> {
        if (e === this.props.defaultValue) {
            this.props.onChange(void(0));
        } else {
            this.props.onChange(e);
        }

    }
    //inline styles, because this is an example
    render() {
        var {options,value, onChange, defaultValue, ...props} = this.props;
        value = value == null ? defaultValue : value;
        return <Select {...props} onChange={this.handleChange} defaultValue={value}
                                  options={this.state.options || options}/>
    }
}
