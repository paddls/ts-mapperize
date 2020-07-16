import {CustomTransformer} from '../model/custom-transformer';

export interface MapperParamContext<I, O> {
  source?: string | keyof I;
  target?: string | keyof O;
  customTransformer?: (() => new(...args: any[]) => CustomTransformer<any, any>);
  transform?: (input: any) => any;
  type?: () => new(...args: any[]) => any;
  params?: MapperParamContext<any, any>[];
  // TODO @RMA ignoreNull
}
