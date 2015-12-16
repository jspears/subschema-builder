"use strict";

import Subschema, {loaderFactory, DefaultLoader} from 'Subschema';

import FieldSetBuilder from './FieldSetBuilder.jsx';
import TypeBuilder from './TypeBuilder.jsx';
import SelectDefault from './SelectDefault.jsx';
import cssClass from './validators/css.js';
import InputFalse from './InputFalse.jsx';
import ToggleTemplate from './ToggleTemplate.jsx';
import ExpressionSelect from './ExpressionSelect.jsx';
import ModalCreateTemplate from './ModalCreateTemplate.jsx';
import SchemaBuilder from './SchemaBuilder.jsx';
import ContentTypeTemplate from './ContentTypeTemplate.jsx';
import Preview from './Preview.jsx';
import SchemaBuilderContext from './SchemaBuilderContext.jsx';

var loader = loaderFactory([DefaultLoader]);
loader.addType({
    FieldSetBuilder,
    TypeBuilder,
    SelectDefault,
    InputFalse,
    ExpressionSelect,
    SchemaBuilder,
    Preview,
    SchemaBuilderContext
});

loader.addValidator({
    cssClass
});

loader.addTemplate({
    ToggleTemplate,
    ModalCreateTemplate,
    ContentTypeTemplate
})

export default loader;