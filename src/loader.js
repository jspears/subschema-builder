"use strict";

import {loaderFactory, DefaultLoader} from 'Subschema';
import types from './types';
import templates from './templates';
import validators from './validators';

var loader = loaderFactory([DefaultLoader]);
loader.addType(types);
loader.addValidator(validators);
loader.addTemplate(templates);

export default loader;