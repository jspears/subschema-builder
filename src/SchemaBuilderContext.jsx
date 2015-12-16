"use strict";
import React, {Component} from 'react';
import Subschema, {PropTypes, types, ValueManager} from 'Subschema';
import normalizeSchema from './normalize';
import SchemaBuilder from './SchemaBuilder.jsx';
import SchemaBuilderLess from './SchemaBuilder.less';

var ObjectType = types.Object;

var toName = (v)=> {
    return {label: v.name, val: v.name}
};

export default class SchemaBuilderContext extends Component {
    static propTypes = ObjectType.propTypes;
    static contextTypes = {
        origLoader: PropTypes.loader,
        valueManager: PropTypes.valueManager
    }
    static childContextTypes = {
        valueManager: PropTypes.valueManager
    };
    static inputClassName = ' ';
    static template = false;
    static noTemplate = true;

    getChildContext() {
        var valueManager, props = this.props, {value} = props, origLoader = this.context.origLoader;
        if (this.valueManager) {
            this.valueManager.removeAll();
            valueManager = this.valueManager;
            valueManager.setValue(value);
        } else {
            valueManager = this.valueManager = ValueManager(value);
        }
        valueManager.update('_types', origLoader.listTypes().map(toName));
        valueManager.update('_templates', origLoader.listTemplates().map(toName));
        valueManager.update('_processors', origLoader.listProcessors().map(toName));
        valueManager.update('_operators', origLoader.listOperators().map(toName));
        valueManager.update('_validators', origLoader.listValidators().map(toName));
        valueManager.update('_schemas', this.context.valueManager.path('_schemas'));
        return {
            valueManager
        };
    }

    render() {
        var {path, ...props} = this.props;
        return <div className="subschema-builder">
            <ObjectType path="" {...props}/>
        </div>;
    }
}
