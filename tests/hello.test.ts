import { describe, expect, it } from '@jest/globals';
import { getGreeting } from '../src/hello.js';

describe('getGreeting', () => {
  it('returns the default greeting', () => {
    expect(getGreeting()).toBe('Hello, World!');
  });

  it('returns a personalized greeting', () => {
    expect(getGreeting('Kapish')).toBe('Hello, Kapish!');
  });
});