import {MapperParamContext} from './mapper-param.context';
import {isFunction} from 'lodash';
import {ArrayMapperFn} from '../model/types';
import {apply} from '../function/apply.function';

export function ArrayMapper<I, O>(type: (() => new(...args: any[]) => O) | string, params: MapperParamContext<I, O>[] = []): any {
  return (target: any, propertyKey: string) => {
    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): ArrayMapperFn<any, any> {
        const transform: ArrayMapperFn<any, any> = function (inputs: any[]): any {
          if (isFunction(type)) {
            return inputs.map((input: any) => apply(type, input, params));
          } else {
            return inputs.map((input: any) => this[type](input));
          }
        }

        return transform;
      },
      enumerable: true,
      configurable: true
    });
  };
}