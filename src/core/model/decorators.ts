import type { Model } from './model';

/**
 * Need this decorator because Model.onPropertyValueChanged is called inside 'stateProperty' decorator
 */
export const useContext = (target: Model, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalValue = descriptor.value;

    descriptor.value = function(...args: any[]) {
        return originalValue.apply(this, args);
    };
};

export const stateProperty = (target: Model, propertyKey: string) => {
    const key = `_${propertyKey}`;

    const getter = function(this: Model) {
        return (this as any)[key];
    };

    // this is Model instance
    const setter = function (this: Model, newValue: any) {
        const prevValue = (this as any)[key];
        (this as any)[key] = newValue;

        // @ts-expect-error
        this.onPropertyValueChanged(propertyKey, newValue, prevValue);
    };

    Object.defineProperty(target, propertyKey, {
        enumerable: true,
        configurable: true,

        get: getter,
        set: setter,
    });
};

export const model = <T extends { new(...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            const state = args[0];

            (this as any).assignState(state);
        }
    };
};
