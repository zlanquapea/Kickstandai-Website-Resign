// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom does not implement IntersectionObserver/ResizeObserver, which
// framer-motion's useInView/whileInView rely on.
class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!('IntersectionObserver' in window)) {
  (window as any).IntersectionObserver = MockObserver;
}
if (!('ResizeObserver' in window)) {
  (window as any).ResizeObserver = MockObserver;
}
