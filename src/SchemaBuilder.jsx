import React, {Component} from 'react';
import Subschema, {loaderFactory, DefaultLoader, tutils, PropTypes} from 'Subschema';
import BuilderLoader from './loader';
import SchemaBuilderLess from './SchemaBuilder.less';
import SchemaBuilderType from './SchemaBuilderType.jsx';
import normalizeSchema, {normalizeFieldsets} from './normalize';
import Preview from './Preview.jsx';
import FieldSetBuilder from './FieldSetBuilder.jsx';

var {FREEZE_OBJ} = tutils;
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

    componentWillMount() {
        this.setup(this.props, FREEZE_OBJ);
    }

    componentWillReceiveProps(props) {
        this.setup(props, this.props);
    }

    setup(props, oldProps) {
        if (props.value !== oldProps.value) {
            var schema = normalizeSchema(props.loader, props.value);
            this.valueManager = ValueManager(schema.subSchema);
        } else if (!oldProps.valueManager || oldProps.valueManager && oldProps.valueManager.value !== props.valueManager.value) {
            this.valueManager = props.valueManager;
            this.valueManager.setValue(normalizeSchema(props.loader, props.valueManager.value).subSchema);
        }
    }

    render() {
        var {valueManager, loader, ...rest} = this.props;
        return <SchemaBuilderContext valueManager={this.valueManager} loader={loader}>
            <div className="subschema-builder">
                <SchemaBuilderType {...rest}/>
                <FieldSetBuilder/>
                <Preview/>
            </div>
        </SchemaBuilderContext>
    }
}