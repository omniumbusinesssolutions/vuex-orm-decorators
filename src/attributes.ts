import { Model, Attribute } from '@vuex-orm/core';
import Mutator from '@vuex-orm/core/lib/attributes/contracts/Mutator';

/**
 * Sets the property as the primary key of the model
 */
export function PrimaryKey(...composite: string[]) {
    return (target: Object, propertyName: string | symbol): void => {
        if (composite.length) {
            let compositeKey = [propertyName].concat(composite);
            (target.constructor as any).primaryKey = compositeKey;
        } else {
            (target.constructor as any).primaryKey = propertyName;
        }
    };
}

/**
 * Adds the property as a model field
 * @param fieldType The field attribute
 */
export function Field(fieldType: Attribute) {
    return (target: Object, propertyName: string | symbol): void => {
        (target.constructor as any)._fields = (target.constructor as any)._fields || {};
        (target.constructor as any)._fields[propertyName] = fieldType;
    };
}

/**
 * Adds the property as a string typed field
 * @param defaultValue The default value for the field (if undefined the default will be '')
 */
export function StringField(defaultValue?: string) {
    return Field(Model.string(defaultValue || ''));
}

/**
 * Adds the property as an incremental field
 */
export function IncrementField() {
    return Field(Model.increment());
}

/**
 * Adds the property as a generic attribute field
 * @param defaultValue The default value for the field (if undiefine dthe default will be '')
 */
export function AttrField(defaultValue?: any) {
    return Field(Model.attr(defaultValue));
}

/**
 * Adds the property as a number typed field
 * @param defaultValue The default value for the field (if undefined the default will be 0)
 */
export function NumberField(defaultValue?: number) {
    return Field(Model.number(defaultValue || 0));
}

/**
 * Adds the property as a boolean typed field
 * @param defaultValue The default value for the field (if undefined the default will be FALSE)
 */
export function BooleanField(value: any, mutator?: Mutator<boolean | null>) {
    return Field(Model.boolean(value, mutator));
}

/**
 * Adds the property as a 'Has Many' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasManyField(related: typeof Model | string, foreignKey: string, localKey?: string) {
    console.log('VuexORMDecorators: HasManyField: related', related);
    console.log('VuexORMDecorators: HasManyField: foreignKey', foreignKey);
    console.log('VuexORMDecorators: HasManyField: localKey?', localKey);
    return Field(Model.hasMany(related, foreignKey, localKey));
}

/**
 * Adds the property as a 'Has One' relationship field
 * @param related The class of the related model
 * @param foreignKey The foreign key of the related model
 * @param localKey The local key on the parent model
 */
export function HasOneField(related: typeof Model | string, foreignKey: string, localKey?: string) {
    console.log('VuexORMDecorators: HasOneField: related', related);
    console.log('VuexORMDecorators: HasOneField: foreignKey', foreignKey);
    console.log('VuexORMDecorators: HasOneField: localKey?', localKey);
    return Field(Model.hasOne(related, foreignKey, localKey));
}

/**
 * Adds the property as a 'Belongs To' relationship field
 * @param parent The class of the parent model
 * @param foreignKey The foreign key of this model
 * @param ownerKey The key on the parent model
 */
export function BelongsToField(parent: typeof Model | string, foreignKey: string, ownerKey?: string) {
    console.log('VuexORMDecorators: BelongsToField: parent', parent);
    console.log('VuexORMDecorators: BelongsToField: foreignKey', foreignKey);
    console.log('VuexORMDecorators: BelongsToField: ownerKey?', ownerKey);
    return Field(Model.belongsTo(parent, foreignKey, ownerKey));
}

export function HasManyByField(parent: typeof Model | string, foreignKey: string, ownerKey?: string) {
    console.log('VuexORMDecorators: HasManyByField: parent', parent);
    console.log('VuexORMDecorators: HasManyByField: foreignKey', foreignKey);
    console.log('VuexORMDecorators: HasManyByField: ownerKey?', ownerKey);
    return Field(Model.hasManyBy(parent, foreignKey, ownerKey));
}

export function HasManyThroughField(related: typeof Model | string, through: typeof Model | string, firstKey: string, secondKey: string, localKey?: string, secondLocalKey?: string) {
    console.log('VuexORMDecorators: HasManyThroughField: related', related);
    console.log('VuexORMDecorators: HasManyThroughField: through', through);
    console.log('VuexORMDecorators: HasManyThroughField: firstKey', firstKey);
    console.log('VuexORMDecorators: HasManyThroughField: secondKey', secondKey);
    console.log('VuexORMDecorators: HasManyThroughField: localKey?', localKey);
    console.log('VuexORMDecorators: HasManyThroughField: secondLocalKey?', secondLocalKey);
    return Field(Model.hasManyThrough(related, through, firstKey, secondKey, localKey, secondLocalKey));
}

export function BelongsToManyField(related: typeof Model | string, pivot: typeof Model | string, foreignPivotKey: string, relatedPivotKey: string, parentKey?: string, relatedKey?: string) {
    console.log('VuexORMDecorators: BelongsToManyField: related', related);
    console.log('VuexORMDecorators: BelongsToManyField: pivot', pivot);
    console.log('VuexORMDecorators: BelongsToManyField: foreignPivotKey', foreignPivotKey);
    console.log('VuexORMDecorators: BelongsToManyField: relatedPivotKey', relatedPivotKey);
    console.log('VuexORMDecorators: BelongsToManyField: parentKey?', parentKey);
    console.log('VuexORMDecorators: BelongsToManyField: relatedKey?', relatedKey);
    return Field(Model.belongsToMany(related, pivot, foreignPivotKey, relatedPivotKey, parentKey, relatedKey));
}

export function MorphToField(id: string, type: string) {
    console.log('VuexORMDecorators: MorphToField: id', id);
    console.log('VuexORMDecorators: MorphToField: type', type);
    return Field(Model.morphTo(id, type));
}

export function MorphOneField(related: typeof Model | string, id: string, type: string, localKey?: string) {
    console.log('VuexORMDecorators: MorphOneField: related', related);
    console.log('VuexORMDecorators: MorphOneField: id', id);
    console.log('VuexORMDecorators: MorphOneField: type', type);
    console.log('VuexORMDecorators: MorphOneField: localKey?', localKey);
    return Field(Model.morphOne(related, id, type, localKey));
}

export function MorphManyField(related: typeof Model | string, id: string, type: string, localKey?: string) {
    console.log('VuexORMDecorators: MorphManyField: related', related);
    console.log('VuexORMDecorators: MorphManyField: id', id);
    console.log('VuexORMDecorators: MorphManyField: type', type);
    console.log('VuexORMDecorators: MorphManyField: localKey?', localKey);
    return Field(Model.morphMany(related, id, type, localKey));
}

export function MorphToManyField(related: typeof Model | string, pivot: typeof Model | string, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string) {
    console.log('VuexORMDecorators: MorphToManyField: related', related);
    console.log('VuexORMDecorators: MorphToManyField: pivot', pivot);
    console.log('VuexORMDecorators: MorphToManyField: relatedId', relatedId);
    console.log('VuexORMDecorators: MorphToManyField: id', id);
    console.log('VuexORMDecorators: MorphToManyField: type', type);
    console.log('VuexORMDecorators: MorphToManyField: parentKey?', parentKey);
    console.log('VuexORMDecorators: MorphToManyField: relatedKey?', relatedKey);
    return Field(Model.morphToMany(related, pivot, relatedId, id, type, parentKey, relatedKey));
}

export function MorphedByManyField(related: typeof Model | string, pivot: typeof Model | string, relatedId: string, id: string, type: string, parentKey?: string, relatedKey?: string) {
    console.log('VuexORMDecorators: MorphedByManyField: related', related);
    console.log('VuexORMDecorators: MorphedByManyField: pivot', pivot);
    console.log('VuexORMDecorators: MorphedByManyField: relatedId', relatedId);
    console.log('VuexORMDecorators: MorphedByManyField: id', id);
    console.log('VuexORMDecorators: MorphedByManyField: type', type);
    console.log('VuexORMDecorators: MorphedByManyField: parentKey?', parentKey);
    console.log('VuexORMDecorators: MorphedByManyField: relatedKey?', relatedKey);
    return Field(Model.morphedByMany(related, pivot, relatedId, id, type, parentKey, relatedKey));
}

