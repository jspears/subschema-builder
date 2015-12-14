"use strict";
import React, {Component} from 'react';


export default class LabelValue extends Component {


    render() {
        var {value, ...props} = this.props;
        value = value || {};
        value = value.value || {};
        return <li className= "brf-value list-group-item-text">{value.val}, {value.label}</li>

    }
}