// debounce
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// throttle
export function throttle<T extends (...args: any[]) => any>(fn: T, limit = 200) {
  let last = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn(...args);
    }
  };
}

// polyfill
export function applyPolyfill() {
  if (!Object.fromEntries) {
    Object.fromEntries = function (iter: any) {
      return [...iter].reduce((obj: any, [key, val]: [any, any]) => {
        obj[key] = val;
        return obj;
      }, {});
    };
  }
}
