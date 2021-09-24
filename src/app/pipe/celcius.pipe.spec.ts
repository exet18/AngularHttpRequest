import { CelciusPipe } from './celcius.pipe';

describe('CelciusPipe', () => {
  it('create an instance', () => {
    const pipe = new CelciusPipe();
    expect(pipe).toBeTruthy();
  });
});
