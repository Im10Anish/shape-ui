import "@testing-library/jest-dom";

// Extend MediaQueryList interface for testing
interface MockMediaQueryList extends MediaQueryList {
  _triggerChange: (newMatches: boolean) => void;
}

// Global test utilities
declare global {
  var testUtils: {
    getCSSVariable: (name: string) => string | undefined;
    setCSSVariable: (name: string, value: string) => void;
    clearCSSVariables: () => void;
    mockMatchMedia: (
      matches?: boolean,
    ) => jest.MockedFunction<(query: string) => MockMediaQueryList>;
    resetMocks: () => void;
    mockSSR: () => {
      restore: () => void;
      deleteWindowObject: () => void;
      deleteDocumentObject: () => void;
    };
  };
}

// CSS Variables storage
const cssVariables = new Map<string, string>();

// Mock localStorage
const createLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
  };
};

// Mock matchMedia
const createMatchMediaMock = (
  matches = false,
): jest.MockedFunction<(query: string) => MockMediaQueryList> => {
  const listeners: Array<(event: MediaQueryListEvent) => void> = [];

  return jest.fn((query: string) => {
    const mediaQueryList: MockMediaQueryList = {
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn((event: string, listener: any) => {
        if (event === "change") listeners.push(listener);
      }),
      removeEventListener: jest.fn((event: string, listener: any) => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      }),
      dispatchEvent: jest.fn(),
      _triggerChange: (newMatches: boolean) => {
        listeners.forEach((listener) =>
          listener({ matches: newMatches } as MediaQueryListEvent),
        );
      },
    };
    return mediaQueryList;
  }) as jest.MockedFunction<(query: string) => MockMediaQueryList>;
};

// CSS Style Declaration mocks
CSSStyleDeclaration.prototype.getPropertyValue = jest
  .fn()
  .mockImplementation(function (property: string): string {
    return property.startsWith("--") ? cssVariables.get(property) || "" : "";
  });

CSSStyleDeclaration.prototype.setProperty = jest
  .fn()
  .mockImplementation(function (property: string, value: string): void {
    if (property.startsWith("--")) cssVariables.set(property, value);
  });

CSSStyleDeclaration.prototype.removeProperty = jest
  .fn()
  .mockImplementation(function (property: string): string {
    if (property.startsWith("--")) {
      const value = cssVariables.get(property) || "";
      cssVariables.delete(property);
      return value;
    }
    return "";
  });

// Make document.documentElement.style iterable
Object.defineProperty(document.documentElement.style, Symbol.iterator, {
  value: function* () {
    for (const [property] of cssVariables) {
      yield property;
    }
  },
  configurable: true,
});

// Setup window mocks
Object.defineProperty(window, "localStorage", {
  value: createLocalStorageMock(),
  writable: true,
});

Object.defineProperty(window, "matchMedia", {
  value: createMatchMediaMock(),
  writable: true,
});

// Global test utilities
globalThis.testUtils = {
  getCSSVariable: (name: string) => cssVariables.get(name),
  setCSSVariable: (name: string, value: string) =>
    cssVariables.set(name, value),
  clearCSSVariables: () => cssVariables.clear(),
  mockMatchMedia: (matches = false) => {
    const mock = createMatchMediaMock(matches);
    Object.defineProperty(window, "matchMedia", {
      value: mock,
      writable: true,
    });
    return mock;
  },
  resetMocks: () => {
    cssVariables.clear();
    window.localStorage.clear();
    jest.clearAllMocks();
    document.documentElement.className = "";
    document.documentElement.removeAttribute("style");
    Object.defineProperty(window, "localStorage", {
      value: createLocalStorageMock(),
      writable: true,
    });
    Object.defineProperty(window, "matchMedia", {
      value: createMatchMediaMock(),
      writable: true,
    });
  },
  mockSSR: () => {
    const originalWindow = global.window;
    const originalDocument = global.document;

    return {
      restore: () => {
        global.window = originalWindow;
        global.document = originalDocument;
      },
      deleteWindowObject: () => {
        delete (global as any).window;
      },
      deleteDocumentObject: () => {
        delete (global as any).document;
      },
    };
  },
};

afterEach(() => {
  globalThis.testUtils.resetMocks();
});
