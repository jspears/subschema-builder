"use strict";
import React, {Component} from 'react';
import {types, processors, tutils, PropTypes} from 'Subschema';
import defaults from 'lodash/object/defaultsDeep';

var {FREEZE_OBJ} = tutils;
var {Autocomplete} = types;
var {OptionsProcessor} = processors;

export default class Path extends Component {
    static propTypes = defaults({
        all: PropTypes.listener
    }, Autocomplete.propTypes);
    static defaultProps = defaults({
        all: "_allFields"
    }, Autocomplete.defaultProps);

    constructor(...args) {
        super(...args);

        this._processor = {
            /** fetch will be called when value changes **/
            fetch: this._fetch,
            /**Value returns the value of the object, not necessarily whats in the input box**/
            value(obj){
                return obj == null ? null : obj.val || obj;
            },
            /**
             * Format returns the format.
             * @param v
             * @returns {null}
             */
            format(v){
                return v == null ? null : v.label || v;
            }
        }
    }

    _fetch = (url, value, component, cb) => {
        value = value && value.toLowerCase();
        var data = (this.props.all || []).filter(v=>v.indexOf(value) === 0).map((v)=> {
            return {
                label: v,
                val: v
            }
        });

        cb(null, data);
    }

    render() {
        var {processor, ...props} = this.props;
        return <Autocomplete {...props} processor={this._processor}/>
    }
}