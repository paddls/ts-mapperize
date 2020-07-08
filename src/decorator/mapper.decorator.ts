import {get, isFunction} from 'lodash';


export interface CustomTransformer {
  transform(input: any): any;
}

export type Builder<T> = (input: Partial<T>) => T;
export type MapperFn<I, O> = (input: I) => O;
export type ArrayMapperFn<I, O> = (input: I[]) => O[];

export interface UseMapper<T> {
  type: () => new(...args: any[]) => T,
  method: keyof T
}

export interface MapperParam<I, O> {
  source?: string | keyof I;
  target?: string | keyof O;
  ignore?: boolean; // TODO @RMA deprecated
  customTransformer?: (() => new(...args: any[]) => CustomTransformer),
  transform?: (input: any) => any
  type?: () => new(...args: any[]) => any,
  params?: MapperParam<any, any>[],
  // TODO @RMA ignoreNull
}


export function Mapper<I, O>(type: (() => new(...args: any[]) => O), params: MapperParam<I, O>[] = []): any {
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

export function ArrayMapper<I, O>(type: (() => new(...args: any[]) => O) | string, params: MapperParam<I, O>[] = []): any {
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

function apply(type: (() => new(...args: any[]) => any), input: any, params: MapperParam<any, any>[]): any {
  const instance = new (type())();

  // TODO @RMA see how to clean up
  // const ignoreKeys: string[] = params
  //   .filter((param: MapperParam<any, any>) => param.ignore || (param.target !== param.source && !isEmpty(param.source)))
  //   .map((param: MapperParam<any, any>) => param.source as string)
  //   .map((source: string) => source.split('.')[0])
  //
  // Object.assign(instance, omit(input, ignoreKeys));

  const mappedParams = params.filter((param: MapperParam<any, any>) => !param.ignore)

  for (let param of mappedParams) {
    const source: any = param.source ? get(input, param.source) : input;
    let value: any = null;

    if (param.transform) {
      value = applyTransform(param, source);
    } else if (param.customTransformer) {
      const customerTransformer: CustomTransformer = new (param.customTransformer())();
      value = customerTransformer.transform(source);
    } else if (param.type) {
      value = source != null ? apply(param.type, source, param.params) : null;
    } else {
      value = source
    }

    // TODO @RMA case of complex type
    // TODO @RMA case of no target

    if (value != null) {
      Object.assign(instance, {
        [param.target ?? param.source]: value
      });
    }
  }
  return instance;
}

function applyTransform(param: MapperParam<any, any>, source): any {
  return param.transform(source);
}
