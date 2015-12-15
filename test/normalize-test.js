"use strict";

import normalize from '../src/normalize';
import expect from 'expect';

describe('normalize', function () {
    it('should normalize a schema wierd', function () {

        var normal = normalize(null, {test: "Text", fieldsets: [{fields: '123'}]});

        expect(normal).toEqual({
            "subSchema": {
                "fieldsets": [{"fields": ["test", "fieldsets"]}],
                "schema": {"test": "Text", "fieldsets": [{"fields": "123"}]}
            }
        })
    });
    it('should normalize a schema even wierd', function () {

        var normal = normalize(null, {test: "Text", fieldsets: {fields: '123'}});

        expect(normal).toEqual({
            "subSchema": {
                "fieldsets": [{"fields": ["test", "fieldsets"]}],
                "schema": {"test": "Text", "fieldsets": {"fields": "123"}}
            }
        })
    });
    it('should normalize options', function () {
        var normal = normalize(null, {type: {options: 'a,b'}});
        expect(normal).toEqual({
            "subSchema": {
                "fieldsets": [{"fields": ["type"]}],
                "schema": {"type": {"options": [{"label": "a", "val": "a"}, {"label": "b", "val": "b"}]}}
            }
        });
    });
    it('should normalize validators', function () {
        var normal = normalize(null, {type: {validators: 'a,b'}});
        expect(normal).toEqual({
            "subSchema": {
                "fieldsets": [{"fields": ["type"]}],
                "schema": {"type": {"validators": [{"type": "a"}, {"type": "b"}]}}
            }
        });
    });

    it('should normalize template string', function () {
        var normal = normalize(null, {type: {template: "string"}});
        expect(normal).toEqual({
                "subSchema": {
                    "fieldsets": [{"fields": ["type"]}],
                    "schema": {"type": {"template": {"template": "string"}}}
                }
            }
        );
    });

    it('should normalize template bool', function () {
        var normal = normalize(null, {type: {template: false}});
        expect(normal).toEqual({
                "subSchema": {
                    "fieldsets": [{"fields": ["type"]}],
                    "schema": {"type": {"template": {"template": false}}}
                }
            }
        );
    });
    it('should normalize recursively', function () {
        var normal = normalize(null, {
            type: {
                template: false,
                subSchema: {
                    more: "stuff"
                }
            }
        });
        expect(normal).toEqual({
                "subSchema": {
                    "fieldsets": [{"fields": ["type"]}],
                    "schema": {
                        "type": {
                            "template": {"template": false},
                            "subSchema": {
                                "fieldsets": [{"fields": ["more"]}],
                                "schema": {"more": "stuff"}
                            }
                        }
                    }
                }
            }
        );
    });
    it('should normalize more recursively', function () {
        var normal = normalize(null, {
            schema: {
                type: {
                    template: false,
                    fields: "more",
                    subSchema: {
                        more: "stuff"
                    }
                }
            }
        });
     //   console.log(JSON.stringify(normal, null, 3) + '');
        expect(normal).toEqual({
                "subSchema": {
                    "fieldsets": [{"fields": ["type"]}],
                    "schema": {
                        "type": {
                            "template": {"template": false},
                            "subSchema": {
                                "fieldsets": [{"fields": ["more"]}],
                                "schema": {"more": "stuff"}
                            }
                        }
                    }
                }
            }
        );
    })

});