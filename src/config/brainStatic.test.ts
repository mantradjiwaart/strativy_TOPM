import { describe, expect, it } from 'vitest';
import { isStrativyBrainStaticMode } from './brainStatic';

describe('isStrativyBrainStaticMode', () => {
  it('defaults to true when env is unset', () => {
    expect(isStrativyBrainStaticMode()).toBe(true);
  });
});
