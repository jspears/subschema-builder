var loader = require('subschema').loader;
function nameToLabelVal(v) {
    return {
        label: v.name,
        val: v.name
    }
}

var schema = {
    type: {
        type: 'Select',
        options: loader.listTypes().map(nameToLabelVal),
        help: 'The type of the field'
    },
    placeholder: {
        type: 'Text',
        help: 'Placeholder text'
    },
    validators: {
        type: 'List',
        canEdit: true,
        canDelete: true,
        canReorder: true,
        canAdd: true,
        itemType: {
            type: 'Select',
            options: loader.listValidators().map(nameToLabelVal)
        }
    },

    help: {
        type: 'Text',
        help: 'Help text (optional)'
    },
    fieldClass: {
        type: 'Text',
        help: 'class to add to the field (optional)'
    },
    template: {
        type: 'Select',
        options: loader.listTemplates().map(nameToLabelVal),
        help: 'The template to render (optional)'
    }
}, fieldset = {
    schema: {
        schema: {
            legend: {
                type: 'Text',
                help: 'A legend for the fieldset (optional)'
            },
            fields: {
                type: 'List',
                itemType: 'Select',
                canEdit: true,
                canDelete: true,
                canReorder: true,
                canAdd: true,
                options: function () {
                    return Object.keys(this.props.valueManager.path('schema'))
                }
            }
        },
        fields: ['legend', 'fields']
    }

}


module.exports = {
    schema: {

        schema: {
            type: 'Mixed',
            help: 'Make some schema magic',
            canEdit: true,
            canDelete: true,
            canReorder: true,
            canAdd: true,
            keyType: {
                type: 'Text'
            },

            valueType: {
                type: 'Object',
                subSchema: schema
            }
        }
    },
    fieldset: ['schema']
}