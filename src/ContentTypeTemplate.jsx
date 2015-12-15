"use strict";
import React, {Component} from 'react';

import Subschema, {templates} from 'Subschema';
import map from 'lodash/collection/map';

var {ContentItemTemplate} = templates;

export default class ContentTypeTemplate extends Component {
    renderKeyValue(value, key) {
        if (key == 'type')return null;
        if (typeof value === 'string') {
            return <span key={`key-${key}`} className="key-name-type"> [{key}:{value}],</span>
        }
    }

    render() {
        var value = this.props.value;

        return <ContentItemTemplate {...this.props}>
            {map(value.value, this.renderKeyValue,this)}
        </ContentItemTemplate>
    }
}