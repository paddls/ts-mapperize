import {CustomTransformer} from '../model/custom-transformer';

export interface MapperParamContext<I, O> {
  /**
   * select from the input, the value to be mapped
   */
  source?: string | keyof I;
  /**
   * select the destination of the value inside the output object
   */
  target?: string | keyof O;
  /**
   * use an existing CustomTransformer class
   */
  customTransformer?: (() => new(...args: any[]) => CustomTransformer<any, any>);
  /**
   * custom function to map value from selected source to target
   * @param input value to transform
   */
  transform?: (input: any) => any;
  /**
   * type of the child object
   */
  type?: () => new(...args: any[]) => any;
  /**
   * list of mapping information for child object
   */
  params?: MapperParamContext<any, any>[];
  // TODO @RMA ignoreNull
}
