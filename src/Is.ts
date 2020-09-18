"use strict";

export class Is {
    public static string(context: any): context is string {
        return typeof context == 'string';
    }

    public static function(context: any): context is Function {
        return typeof context === 'function' && context.hasOwnProperty('name');
    }

    public static class(context: any): context is Object {
        return typeof context == 'object' && Is.function(context.constructor);
    }
}