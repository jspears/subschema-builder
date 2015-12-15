"use strict";

import React, {Component} from 'react';
import Subschema, {PropTypes,  loaderFactory, ValueManager, types,decorators, DefaultLoader} from 'Subschema';
import defaults from 'lodash/object/defaults';
//var {listen} = decorators;

var ObjectType = types.Object;

var schema = {
    schema: {
        schema: {
            type: 'Mixed',
            template: false,
            labelKey: 'type',
            valueType: {
                type: 'TypeBuilder'
            },
            contentTemplate: 'ContentTypeTemplate',
            createTemplate: 'ModalCreateTemplate',
            canAdd: true,
            canEdit: true,
            canRemove: true
        }
    },
    fieldsets: {fields: ['schema']}
}, subSchema = {
    schema: {
        subSchema: {
            type: 'Mixed',
            title: 'SubSchema',
            labelKey: 'type',
            contentTemplate: 'ContentTypeTemplate',
            valueType: {
                type: 'TypeBuilder'
            },
            createTemplate: 'ModalCreateTemplate',
            canAdd: true,
            canEdit: true,
            canRemove: true
        }
    },
    fields: ['subSchema']
};
;


export default class SchemaBuilderType extends Component {
    static contextTypes = ObjectType.contextTypes;
    static propTypes = defaults({nested: PropTypes.bool}, ObjectType.propTypes);
    /* static childContextTypes = ObjectType.contextTypes;

     getChildContext() {
     if (!this.props.nested) {
     return this.context;
     }
     var {loader, valueManager}  = this.context;
     var {...value} = valueManager.path(this.props.path);
     var newValue = {
     subSchema: value
     }
     var newValueManager = ValueManager(valueManager.getValue());
     newValueManager.update(this.props.path, newValue);
     var remove = newValueManager.addListener(this.props.path,  (value)=> {
     console.log('what? ', value);
     var {...copy} = value.subSchema;
     setTimeout(()=>{
     valueManager.update(this.props.path,  copy);
     remove && remove.remove();
     }, 100);
     }, this, false);
     return {loader, valueManager: newValueManager};
     }*/

    handleSubmit = (e)=> {
        console.log('what?', e)
    }

    render() {
        var {valueManager,className, nested, loader, ...rest} = this.props;

        return <ObjectType {...rest} className='form-group' schema={schema}
                                     onSubmit={this.handleSubmit}/>

    }
}