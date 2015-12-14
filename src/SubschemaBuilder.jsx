var React = require('react');
var Subschema = require('subschema');
var loader = Subschema.loader;
var Form = Subschema.Form;
var schema = require('./schema');
var util = Subschema.util;
var extend = util.extend;
var virginValueType = extend({}, schema.schema.schema.valueType.subSchema);
var virginFields = schema.schema.schema.valueType.fields.concat();
var SelectOptions = {
    options: {
        type: 'List',
        help: 'A list of possible values',
        canEdit: true,
        canDelete: true,
        canReorder: true,
        canAdd: true,
        labelKey: 'label',
        itemType: {
            type: 'Object',
            subSchema: {
                label: 'Text',
                val: 'Text'
            }
        }
    }

}, CollectionOptions = {
    canEdit: {
        type: 'Checkbox',
        help: 'Allow editing'
    },
    canDelete: {
        type: 'Checkbox',
        help: 'Allow delete'
    },
    canReorder: {
        type: 'Checkbox',
        help: 'Allow reorder'
    },
    canAdd: {
        type: 'Checkbox',
        help: 'Allow adding items'
    }
};

var SubschemaBuilder = React.createClass({
    getInitialState(){
        return {
            schema: this.props.schema || schema
        }
    },
    swapSchema(swapped){
        var state = {schema: this.state.schema}, valueType = state.schema.schema.schema.valueType
        if (!swapped) {
            valueType.subSchema = virginValueType;
            valueType.fields = virginFields;
        } else {
            valueType.subSchema = extend({}, virginValueType, swapped);
            valueType.fields = virginFields.slice(0, 2).concat(Object.keys(swapped), virginFields.slice(2));
        }
        this.setState(state);
    },
    componentWillMount(){
        this.props.valueManager.addCreateValueListener(this.props.path, this.register, this);
        console.log('will mount', this.state);
        if (this.props.type){
            this.swapSchema(this.updateConfig(this.props.type));
        }
    },
    componentWillUnmount(){
        this.props.valueManager.removeCreateValueListener(this.props.path, this.register);
    },
    register: function (newVM, path) {
        console.log('register', path);
        newVM.addListener('value.type', this.handleChange, this, true);
        //    return false;
    },
    updateConfig(value){
        console.log('config type', value);
        switch (value) {
            case 'Object':
            {
                return {
                    subSchema: {
                        type: 'SubschemaBuilder'
                    }
                };
            }
            case 'Mixed':
            {
                return util.extend({
                    valueType: {
                        type: 'SubschemaBuilder'
                    },
                    keyType: {
                        type: 'Select',
                        options: ['Text', 'Select']
                    }
                }, CollectionOptions);

            }
            case 'List':
            {

                return extend({
                    itemType: {
                        type: 'SubschemaBuilder'
                    }
                }, CollectionOptions);

            }
            case 'Text':
            case 'TextArea':
            {
                return {
                    placeholder: {
                        type: "Text"
                    }
                }
            }
            case 'Radio' :
            case 'Checkboxes':
            case 'Select' :
            {

                return SelectOptions;
            }
        }
    },
    handleChange(value){
        console.log('handleChange', this.props.path, value);
        this.swapSchema(this.updateConfig(value));
    },
    render()
    {

        return (<div className='subschema-builder'>
            <Form schema={this.state.schema} valueManager={this.props.valueManager}/>
        </div>);
    }
});

var SubschemaBuilderEmbed = React.createClass({

    handleAdd(e){
        e && e.preventDefault();
        this.updateValue(this.valueManager.path('schema'));
        this.props.onRequestHide(e);
    },
    componentWillMount(){
        var value = this.props.valueManager.getValue()
        var key = value.key;
        var subSchema = (value && value.value || value || {}).subSchema;

        if (!subSchema){
            subSchema = {};
            subSchema[value.type] = value;
        }
        this.valueManager = Subschema.ValueManager({schema: subSchema});
        this.setState({
            path:key,
            type:value.type
        });

    },
    updateValue(val){
        this.props.valueManager.update(this.props.path, val);
    },
    render(){
        return <SubschemaBuilder {...this.props} path={this.state.path} type={this.state.type} valueManager={this.valueManager} className={'flex-container'}/>

    }
});

loader.addTemplate('EditorTemplateNested', require('./EditorTemplateNested.jsx'));
loader.addType('SubschemaBuilder', SubschemaBuilderEmbed);
loader.addTemplate("CreateBuilderTemplate", require('./template/CreateBuilderTemplate.jsx'));
module.exports = SubschemaBuilder;

