var React = require('react');
var Subschema = require('subschema');
var loader = Subschema.loader;
var Form = Subschema.Form;
var schema = require('./schema');
var util = Subschema.util;
var ListOptions = {
    type: 'List',
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

}, HiddenOption = {
    type: 'Hidden'

};
loader.addTemplate('EditorTemplateNested', require('./EditorTemplateNested.jsx'));

var SubschemaBuilder = React.createClass({
    getInitialState(){
        return {
            schema: schema
        }
    },
    swapSchema(swapped){
        this.state.schema.schema.schema
        var subSchema = this.state.schema.schema.schema.valueType.subSchema;
        subSchema.options = swapped;
        this.setState({schema: util.extend({}, this.state.schema)});
    },
    componentWillMount(){
        this.props.valueManager.addCreateValueListener(null, this.register, this);
    },
    componentWillUnmount(){
        this.props.valueManager.removeCreateValueListener(null, this.register);
        loader.removeLoader(this._loader);
    },
    register: function (newVM) {
        //  this.swapSchema()
        newVM.addListener('value.type', this.handleChange, this);
    },
    handleChange(value, oldValue, path){
        path = path || '';
        switch (value) {
            case 'List':
            {
                this.swapSchema(ListOptions);
                break;
            }
            default:
                this.swapSchema();
        }
    },
    render(){
        return <Form schema={this.state.schema} valueManager={this.props.valueManager}/>
    }
});

module.exports = SubschemaBuilder;

