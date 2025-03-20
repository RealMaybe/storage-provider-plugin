import { type UserOptionsType } from "./classConfigType";
import {
    StorageProvider,
    ob
} from "./provider";

/**
 * @description Not configure the option for the original class
 */
export interface NotSet {
    instantiate: false,
}

/**
 * @description Configure the option for the original class
 */
export interface CustomSet {
    instantiate: true,
    classOptions: UserOptionsType
}

/**
 * @description Settings for the plugin
 */
export type ObsoleteStorageSettings = NotSet | CustomSet;

/**
 * @description The result of the plugin
 */
export type ObsoleteStorageResult = ob | typeof ob | StorageProvider | typeof StorageProvider;