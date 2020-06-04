import { Model } from '@vuex-orm/core';
import { Plugin } from 'vuex';
export declare class ORMDatabase {
    private static _ormDatabase;
    private static _installed;
    static install(options: any): Plugin<any>;
    static registerEntity(model: typeof Model): void;
}
