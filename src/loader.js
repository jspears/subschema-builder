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
import LabelValue from './LabelValue.jsx';
import SchemaBuilder from './SchemaBuilderType.jsx';

var loader = loaderFactory([DefaultLoader]);
loader.addType({
    FieldSetBuilder,
    TypeBuilder,
    SelectDefault,
    InputFalse,
    ExpressionSelect,
    SchemaBuilder
});

loader.addValidator({
    cssClass
});

loader.addTemplate({
    LabelValue,
    ToggleTemplate,
    ModalCreateTemplate
})

export default loader;