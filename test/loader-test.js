"use strict";

import builderLoader from '../src/loader';
import expect from 'expect';
import SchemaBuilder from '../src/SchemaBuilder.jsx';
describe('loader', function () {
    it('should load SchemaBuilder', function () {
        var sb = builderLoader.loadType("SchemaBuilder");
        expect(sb).toExist();
        expect(sb).toBe(SchemaBuilder);
    });
})