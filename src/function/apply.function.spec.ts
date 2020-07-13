import {apply} from './apply.function';
import {CustomTransformer} from '../model/custom-transformer';

class A {
  public a: string;

  public child: A;

  public constructor(data: Partial<A> = {}) {
    Object.assign(this, data);
  }
}

describe('applyFunction', () => {

  it('should transform source to target', () => {
    const result: A = apply(() => A, {b: 'some value'}, [
      {target: 'a', source: 'b'}
    ]);

    expect(result).toEqual(new A({
      a: 'some value'
    }));
  });


  it('should transform null value source to target', () => {
    const result: A = apply(() => A, {b: null}, [
      {target: 'a', source: 'b'}
    ]);

    expect(result).toEqual(new A({
      a: null
    }));
  });

  it('should transform default target', () => {
    const result: A = apply(() => A, {a: 'some value'}, [
      {source: 'a'}
    ]);

    expect(result).toEqual(new A({
      a: 'some value'
    }));
  });

  it('should transform with transform method', () => {
    const result: A = apply(() => A, {b: 'some value'}, [
      {target: 'a', source: 'b', transform: (input: string) => `${input} !`}
    ]);

    expect(result).toEqual(new A({
      a: 'some value !'
    }));
  });

  it('should transform with transform method and without source', () => {
    const result: A = apply(() => A, {b: 'some value'}, [
      {target: 'a', transform: (input: any) => `${input.b} !`}
    ]);

    expect(result).toEqual(new A({
      a: 'some value !'
    }));
  });

  it('should transform with transform method and without source', () => {
    const result: A = apply(() => A, {b: 'some value'}, [
      {target: 'a', transform: (input: any) => `${input.b} !`}
    ]);

    expect(result).toEqual(new A({
      a: 'some value !'
    }));
  });

  it('should transform with custom transformer', () => {
    class MyTransformer implements CustomTransformer<string, string> {
      public transform(input: string): string {
        return `${input} ?`;
      }
    }

    const result: A = apply(() => A, {b: 'some value'}, [
      {target: 'a', source: 'b', customTransformer: () => MyTransformer}
    ]);

    expect(result).toEqual(new A({
      a: 'some value ?'
    }));
  });

  it('should transform with deep object', () => {
    class MyTransformer implements CustomTransformer<string, string> {
      public transform(input: string): string {
        return `${input} ?`;
      }
    }

    const result: A = apply(() => A, {b: 'some value', c: 'some more value'}, [
      {target: 'a', source: 'b'},
      {
        target: 'child', type: () => A, params: [
          {target: 'a', source: 'c'}
        ]
      },
    ]);

    expect(result).toEqual(new A({
      a: 'some value',
      child: new A({
        a: 'some more value'
      })
    }));
  });
});