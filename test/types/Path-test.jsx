"use strict";

import Path from '../../src/types/Path.jsx';
import {React, into, expect, change, byComponent} from '../support';
import Subschema, {ValueManager} from 'Subschema';

var {Form, loaderFactory, DefaultLoader} = Subschema;
var loader = loaderFactory([DefaultLoader]);
loader.addType({Path});

describe.only('types/Path', function () {


    it('should show options from _allFields', function () {

        var valueManager = ValueManager({
            _allFields: ['f1', 'f2', 'g','g.stuff','g.more.stuff', 'f3']
        });
        var form = into(<Form loader={loader} schema={{schema:{
                'path':'Path'
        }}} valueManager={valueManager}/>, true);
        var path = byComponent(form, Path);
        expect(path).toExist();
        expect(form).toExist();
        change(path, 'f');

    })


   /* it('should show options from _allFields', function () {

        var valueManager = ValueManager({
            _allFields: ['f1', 'f2', 'g','g.stuff','g.more.stuff', 'f3']
        });
        var form = into(<Form loader={loader} schema={{schema:{
                'path':'Path'
        }}} valueManager={valueManager}/>, true);
        var path = byComponent(form, Path);
        expect(path).toExist();
        expect(form).toExist();

    })*/
});