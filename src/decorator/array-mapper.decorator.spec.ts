import {ArrayMapperFn} from '../model/types';
import {ArrayMapper} from './array-mapper.decorator';

describe('ArrayMapperDecorator', () => {
  it('should transform by internal method', () => {
    class Mapping {

      @ArrayMapper('mapTo')
      public arrayMapTo: ArrayMapperFn<any, any>

      public mapTo: any = () => void 0
    }

    const mapper: Mapping = new Mapping();

    spyOn(mapper, 'mapTo').and.returnValues('output1', 'output2');

    expect(mapper.arrayMapTo(['input1', 'input2'])).toEqual(['output1', 'output2']);
    expect(mapper.mapTo).toHaveBeenNthCalledWith(1, 'input1');
    expect(mapper.mapTo).toHaveBeenNthCalledWith(2, 'input2');
  });

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

      @ArrayMapper(() => B, [
        {target: 'b', source: 'a'}
      ])
      public arrayMapTo: ArrayMapperFn<A, B>
    }

    const mapper: Mapping = new Mapping();

    expect(mapper.arrayMapTo([new A('toto'), new A('titi')])).toEqual([new B('toto'), new B('titi')]);
  });
});