import {MapperParamContext} from '../decorator/mapper-param.context';
import {get, isUndefined} from 'lodash';

export function apply(type: (() => new(...args: any[]) => any), input: any, params: MapperParamContext<any, any>[]): any {
  const instance = new (type())();

  for (let param of params) {
    const source: any = param.source ? get(input, param.source) : input;
    let value: any = null;

    if (param.transform) {
      value = param.transform(source);
    } else if (param.customTransformer) {
      value = new (param.customTransformer())().transform(source);
    } else if (param.type) {
      value = source != null ? apply(param.type, source, param.params) : null;
    } else {
      value = source
    }

    if (!isUndefined(value)) {
      Object.assign(instance, {
        [param.target ?? param.source]: value
      });
    }
  }
  return instance;
}