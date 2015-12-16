"use strict";
import React, {Component} from 'react';
import Subschema, {PropTypes, types, loaderFactory, DefaultLoader, ValueManager} from 'Subschema';
import normalizeSchema from './normalize';
import SchemaBuilder from './SchemaBuilder.jsx';
import SchemaBuilderLess from './SchemaBuilder.less';
import builderLoader from '../src/loader';
var toName = (v)=> {
    return {label: v.name, val: v.name}
};
export default class SubschemaBuilderContext extends Component {
    static propTypes = {
        loader: PropTypes.loader,
        builderLoader: PropTypes.loader
    }
    static childContextTypes = {
        origLoader: PropTypes.loader,
        loader: PropTypes.loader,
        valueManager: PropTypes.valueManager
    }

    getChildContext() {
        var origLoader = this.props.loader || loaderFactory([DefaultLoader]), value = {
            '_types': origLoader.listTypes().map(toName),
            '_templates': origLoader.listTemplates().map(toName),
            '_processors': origLoader.listProcessors().map(toName),
            '_operators': origLoader.listOperators().map(toName),
            '_validators': origLoader.listValidators().map(toName),
            '_schemas': origLoader.listSchemas().map(toName)
        }, valueManager = ValueManager(value), loader = this.props.builderLoader || builderLoader;

        return {
            valueManager,
            loader,
            origLoader
        }
    }

    render() {
        return <div className="subschema-builder">{this.props.children}</div>
    }
}