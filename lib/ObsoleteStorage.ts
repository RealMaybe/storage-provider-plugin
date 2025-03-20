import { isBoolean, isObjectAndNotArray } from "./type/checkType";
import { type UserOptionsType } from "./tsType/classConfigType";
import { StorageProvider } from "./tsType/provider";
import { type OutputType, type OutputResult, } from "./tsType/methodType";
import { type ObsoleteStorageSettings, type ObsoleteStorageResult } from "./tsType/pluginType";


/* ========== */


/**
 * StorageProvider Plugin
 * @version 0.1.1
 * @author RealMaybe
 * @license MIT
 * @see https://github.com/RealMaybe/StorageProvider
 * 
 * @function ObsoleteStorage
 * @param { StorageProvider } $SP StorageProvider
 * @param { ObsoleteStorageSettings } [settings] Settings for the plugin
 * @returns { ObsoleteStorageResult }
 */
export function ObsoleteStorage(
    $SP: typeof StorageProvider,
    settings?: ObsoleteStorageSettings
): ObsoleteStorageResult {
    class ob extends $SP {
        constructor(options: UserOptionsType) { super(options) };

        Storage(key: string, value?: any): void | any { return this.storage(key, value) };

        Save(key: string, value: any): void { this.save(key, value) };

        SaveMany(values: Array<{ key: string, value: any }>): void { this.saveMany(values) };

        SetMany(values: { [key: string]: any }): void { this.setMany(values) };

        Set(...content:
            Array<{ key: string, value: any }>
            | [{ [key: string]: any }]
            | [string, any]
        ): void { this.set(...content) };

        Get(key: string): void { return this.get(key) };

        GetMany<K extends string>(
            values: Array<K>,
            type: OutputType = "object"
        ): OutputResult<K, typeof type> { return this.getMany(values, type) };

        GetAll(): { [storageKey: string]: any } { return this.getAll() };

        Delete(key: null | string = null): void { this.delete(key) };

        Remove(key: string): void { this.remove(key) };

        RemoveMany(keys: Array<string>): void { this.removeMany(keys) };

        Clean(): void { this.clean() };
    };

    const {
        instantiate,
        classOptions
    } = (() => {
        if (
            settings &&
            isObjectAndNotArray(settings) &&
            isBoolean(settings.instantiate) &&
            settings.instantiate
        ) return settings;

        return {
            instantiate: false,
            classOptions: "local" as UserOptionsType
        }
    })();

    return isBoolean(instantiate) && instantiate ? new ob(classOptions) : ob;
}