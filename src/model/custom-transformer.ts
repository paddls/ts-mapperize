export interface CustomTransformer<I, O> {
  transform(input: I): O;
}