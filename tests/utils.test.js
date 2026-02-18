import { describe, it, expect } from 'vitest';

describe('Utils - cn', () => {
  it('should merge class names correctly', () => {
    const { cn } = require('../src/utils/cn');

    const result = cn('foo', 'bar', 'baz');

    expect(result).toContain('foo');
    expect(result).toContain('bar');
    expect(result).toContain('baz');
  });

  it('should handle empty arguments', () => {
    const { cn } = require('../src/utils/cn');

    const result = cn();

    expect(result).toBe('');
  });

  it('should handle conditional classes', () => {
    const { cn } = require('../src/utils/cn');

    const result = cn('base', { 'active': true });

    expect(result).toContain('base');
    expect(result).toContain('active');
  });
});

describe('Utils - generateId', () => {
  it('should generate unique IDs', () => {
    const { generateId } = require('../src/utils/cn');

    const id1 = generateId();
    const id2 = generateId();

    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^\d+-[a-z0-9]+$/);
  });

  it('should include timestamp', () => {
    const { generateId } = require('../src/utils/cn');

    const id = generateId();
    const timestamp = id.split('-')[0];

    expect(parseInt(timestamp)).toBeGreaterThan(Date.now() - 100000);
  });
});

describe('Utils - formatDateTime', () => {
  it('should format date correctly', () => {
    const { formatDateTime } = require('../src/utils/cn');

    const date = new Date('2026-02-18T15:00:00.000Z');
    const result = formatDateTime(date);

    expect(result).toContain('2026');
  });

  it('should handle invalid date', () => {
    const { formatDateTime } = require('../src/utils/cn');

    const result = formatDateTime(null);

    expect(typeof result).toBe('string');
  });
});

describe('Utils - formatFileSize', () => {
  it('should format bytes correctly', () => {
    const { formatFileSize } = require('../src/utils/cn');

    expect(formatFileSize(0)).toBe('0 Bytes');
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
  });
});
