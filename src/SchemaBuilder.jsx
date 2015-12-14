import React, {Component} from 'react';
import Subschema, {PropTypes, loaderFactory, types,decorators, DefaultLoader} from 'Subschema';
import BuilderLoader from './loader';
import SchemaBuilderLess from './SchemaBuilder.less';
import SchemaBuilderType from './SchemaBuilderType.jsx';
import SchemaView from './SchemaView.jsx';

var builderLoader = loaderFactory([DefaultLoader, BuilderLoader]);
var toName = (v)=>v.name;

class SchemaBuilderContext extends Component {
    static contextTypes = PropTypes.contextTypes;
    static childContextTypes = PropTypes.contextTypes;

    getChildContext() {
        var {valueManager, loader} = this.props;
        valueManager.update('_types', loader.listTypes().map(toName));
        valueManager.update('_templates', loader.listTemplates().map(toName));
        valueManager.update('_processors', loader.listProcessors().map(toName));
        valueManager.update('_operators', loader.listOperators().map(toName));
        valueManager.update('_validators', loader.listValidators().map(toName));
        return {
            valueManager,
            loader: builderLoader
        }
    }

    render() {
        return this.props.children;
    }
}

export default class SchemaBuilder extends Component {
    static contextTypes = PropTypes.contextTypes;
    static propTypes = {
        loader: PropTypes.loader,
        valueManager: PropTypes.valueManager
    }

    render() {
        var {valueManager, loader, ...rest} = this.props;
        return <SchemaBuilderContext valueManager={valueManager} loader={loader}>
            <div>
                <SchemaBuilderType {...rest}/>
                <SchemaView/>
            </div>
        </SchemaBuilderContext>
    }
}