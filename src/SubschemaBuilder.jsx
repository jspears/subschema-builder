var React = require('react');
var Subschema = require('subschema');
var loader = Subschema.loader;
var Form = Subschema.Form;
var schema = require('./schema');
var util = Subschema.util;
var extend = util.extend;
var virginValueType = extend({}, schema.schema.schema.valueType.subSchema);
var virginFields = schema.schema.schema.valueType.fields.concat();
var CreateItemMixin = require('subschema/src/types/CreateItemMixin');
var BasicFieldMixin = require('subschema/src/BasicFieldMixin');
var {Button,ModalTrigger,Modal} = require('react-bootstrap');
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
            schema: schema
        }
    },
    swapSchema(swapped){
        var state = {schema: this.state.schema}, valueType = state.schema.schema.schema.valueType
        if (!swapped) {
            valueType.subSchema = virginValueType;
            valueType.fields = virginFields;
        } else {
            valueType.subSchema = extend({}, virginValueType, swapped);
            valueType.fields = virginFields.slice(0, 1).concat(Object.keys(swapped), virginFields.slice(1));
        }
        this.setState(state);
    },
    componentWillMount(){
        this.props.valueManager.addCreateValueListener(this.props.path, this.register, this);
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

var SubschemaBuilderModal = React.createClass({

    handleAdd(e){
        e && e.preventDefault();
        this.updateValue(this.valueManager.path('schema'));
        this.props.onRequestHide(e);
    },
    componentWillMount(){
        var value = this.props.valueManager.getValue()
        value = value && value.subSchema;
        this.valueManager = Subschema.ValueManager({schema: value});
    },
    updateValue(val){
        this.props.valueManager.update(this.props.path, val);
    },
    render(){
        var {onRequestHide, ...props} = this.props;
        return <Modal bsStyle='primary' title='Subschema Schema' animation={true}
                      onRequestHide={this.props.onRequestHide}>
            <div className='modal-body clearfix'>
                <div className='flex-container'>
                    <SubschemaBuilder {...props} valueManager={this.valueManager} className={'flex-container'}/>
                </div>
            </div>
            <div className='modal-footer'>
                <Button onClick={onRequestHide}>Close</Button>
                <Button onClick={this.handleAdd}>Add</Button>
            </div>
        </Modal>
    }
});
var SubschemaBuilderModalTrigger = React.createClass({

    render () {
        return <ModalTrigger modal={<SubschemaBuilderModal {...this.props}/>}>
            <Button>Edit Schema</Button>
        </ModalTrigger>
    }

})
loader.addTemplate('EditorTemplateNested', require('./EditorTemplateNested.jsx'));
loader.addType('SubschemaBuilder', SubschemaBuilderModalTrigger);
loader.addType('OrType', require('./OrType.jsx'));
loader.addTemplate('OrTypeTemplate', require('./template/OrTypeTemplate.jsx'));

module.exports = SubschemaBuilder;

