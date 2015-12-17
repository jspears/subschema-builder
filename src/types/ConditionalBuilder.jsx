"use strict";

import React, {Component} from 'react';
import Subschema, {PropTypes,  loaderFactory, ValueManager, types,decorators, DefaultLoader} from 'Subschema';
import defaults from '../../node_modules/lodash/object/defaultsDeep';

var {Mixed} = types;
var ObjectType = types.Object;

export default class ConditionalBuilder extends ObjectType {
    static propTypes = ObjectType.propTypes;
    static defaultProps = defaults({
        subSchema: {
            schema: {
                operator: {
                    type: 'ExpressionSelect',
                    optionsPath: '_operators',
                    help: "Operator to determine truth"
                },
                value: {
                    type: 'InputFalse',
                    help: "The value to compare path to"

                },
                template: {
                    type: 'ExpressionSelect',
                    optionsPath: '_templates',
                },
                falseTemplate: {
                    type: 'ExpressionSelect',
                    optionsPath: '_templates',
                },
                error: {
                    type: "Path",
                    help: "Error path to listen to"
                },
                dismiss: {
                    type: "Path",
                    help: "Path to update to dismiss"
                }

            }
        }
    }, ObjectType.defaultProps);
}