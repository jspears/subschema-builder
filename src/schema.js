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
        help: 'The type of the field defaults (Text)'
    },
    validators: {
        help: 'Validators for this field (optional)',
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
                },
                template: 'EditorTemplateNested'
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
                type: 'Text',
                validators: ['required']
            },
            labelKey:'help',
            valueType: {
                type: 'Object',
                subSchema: schema,
                fields: ['type', 'options', 'validators', 'help', 'filedClass', 'template']
            }
        }
    },
    fieldset: ['schema']
}