var React = require('react');
var SchemaBuilder = require('../src/SubschemaBuilder.jsx');
var vm = require('subschema').ValueManager();
var App = React.createClass({
    getInitialState(){
        return {
            data: {}
        };
    },
    componentWillMount(){
        vm.addListener(null, this.update, this);
    },
    componentWillUnmount(){
        vm.removeListener(null, this.update);
    },
    update(data){
        this.setState({data});
    },
    render(){
        return <div>
            <h3>Schema Builder</h3>
            <SchemaBuilder valueManager={vm}/>
            <pre>
                {JSON.stringify(this.state.data, null, 2)}
             </pre>
        </div>
    }
});

React.render(<App/>, document.getElementById('content'));