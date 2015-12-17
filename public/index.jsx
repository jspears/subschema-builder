import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Subschema, {Form, loader, loaderFactory, DefaultLoader, ValueManager} from 'Subschema';
import App from './app.jsx';
import samples from './samples'

loader.addSchema(samples);

ReactDOM.render(<div><h1>SchemaBuilder Demo</h1><App loader={loader}/>
</div>, document.getElementById('content'));