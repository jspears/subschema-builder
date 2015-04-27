var React = require('react');
var EditorTemplateNested = React.createClass({
    displayName: 'EditorTemplateNested',
    componentWillMount(){
        this.props.valueManager.addErrorListener(this.props.path, this.setError, this, true);
    },
    componentWillUnmount(){
        this.props.valueManager.removeErrorListener(this.props.path, this.setError);
    },
    setError(errors){
        this.setState({
            error: errors && errors[0].message
        });
    },
    render(){
        var {name, title, help, errorClassName, message, fieldClass, children} = this.props;
        var error = this.state.error;
        return (<div
            className={"form-group field-name " + (error != null ? errorClassName : '') + ' ' +  fieldClass}>
            {children}
            <p className="help-block" ref="help">{error || help}</p>
        </div>);
    }
});
module.exports = EditorTemplateNested;