import {MapperParamContext} from '../decorator/mapper-param.context';
import {get, isArray, isUndefined} from 'lodash';

export function apply(type: (() => new(...args: any[]) => any), input: any, params: MapperParamContext<any, any>[]): any {
  const instance: any = new (type())();

  for (const param of params) {
    const source: any = param.source ? get(input, param.source) : input;
    let value: any = null;

    if (isArray(source)) {
      value = source.map((v: any) => applyTransform(v, param));
    } else {
      value = applyTransform(source, param);
    }

    if (!isUndefined(value)) {
      Object.assign(instance, {
        [param.target ? param.target: param.source]: value,
      });
    }
  }

  return instance;
}

function applyTransform(source: any, param: MapperParamContext<any, any>): any {
  let value: any;

  if (param.transform) {
    value = param.transform(source);
  } else if (param.customTransformer) {
    value = new (param.customTransformer())().transform(source);
  } else if (param.type && source != null) {
    value = apply(param.type, source, param.params);
  } else {
    value = source;
  }

  return value;
}
