/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 *
 * solution from https://mswjs.io/docs/migrations/1.x-to-2.x#remap-fetch-api-globals
 */

const { TextDecoder, TextEncoder } = require('node:util');

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

// to remove Error: Not implemented: window.scrollTo
const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
