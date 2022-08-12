import { CustomTimeFormat } from './pipes.pipe';

describe('CustomTimeFormat', () => {
  it('create an instance', () => {
    const pipe = new CustomTimeFormat();
    expect(pipe).toBeTruthy();
  });
});
