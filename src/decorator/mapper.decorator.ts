import {MapperFn} from '../model/types';
import {MapperParamContext} from './mapper-param.context';
import {apply} from '../function/apply.function';


export function Mapper<I, O>(type: (() => new(...args: any[]) => O), params: MapperParamContext<I, O>[] = []): any {
  return (target: any, propertyKey: string) => {
    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): MapperFn<any, any> {
        const transform: MapperFn<any, any> = function (input: any): any {
          return apply(type, input, params);
        }

        return transform;
      },
      enumerable: true,
      configurable: true
    });
  };
}

