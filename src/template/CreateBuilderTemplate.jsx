"use strict";

var React = require('react');
var loader = require('subschema').loader;
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var CreateItemMixin = require('subschema/src/types/CreateItemMixin');
var Editor = require('subschema/src/Editor');
var CreateBuilderTemplate = React.createClass({
    mixins: [CreateItemMixin],
    render(){

        return <Modal title={this.props.title+' '+this.props.value.key}
                      bsStyle='primary'
                      backdrop={true}
                      animation={true}
                      onRequestHide={this.props.onCancel}>
            <div className='modal-body clearfix'>
                <Editor ref="itemEditor" field={this.props.field} value={this.props.value}
                        valueManager={this.valueManager}
                        pid={this.props.editPid}
                        />
            </div>
            <div className='modal-footer'>
                <Button onClick={this.props.onCancel}>Close</Button>
                <Button bsStyle='primary' onClick={this.handleSubmit}>Save changes</Button>
            </div>
        </Modal>

    }
});
module.exports = CreateBuilderTemplate;