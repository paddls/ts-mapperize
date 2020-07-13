import {MapperFn} from '../model/types';
import {Mapper} from './mapper.decorator';

describe('MapperDecorator', () => {
  it('should transform by custom configuration', () => {
    class A {
      public constructor(public a: string) {
      }
    }

    class B {
      public constructor(public b: string) {
      }
    }

    class Mapping {

      @Mapper(() => B, [
        {target: 'b', source: 'a'}
      ])
      public mapTo: MapperFn<A, B>
    }

    const mapper: Mapping = new Mapping();

    expect(mapper.mapTo(new A('toto'))).toEqual(new B('toto'));
  });
});