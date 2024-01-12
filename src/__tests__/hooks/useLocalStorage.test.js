/**
 * Checks if the hook returns the initialValue when there is no value stored in localStorage.
 * Checks if the hook retrieves and returns the correct value from localStorage if it is present.
 * Checks if the hook is able to set a new value in both the hook's state and in localStorage.
 */

import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useLocalStorage hook", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should use initialValue if localStorage is empty", () => {
    const initialValue = "default";
    const { result } = renderHook(() =>
      useLocalStorage("testKey", initialValue)
    );

    expect(result.current[0]).toBe(initialValue);
  });

  it("should retrieve an existing value from localStorage", () => {
    const testValue = "storedValue";
    window.localStorage.setItem("testKey", JSON.stringify(testValue));
    const { result } = renderHook(() => useLocalStorage("testKey", "default"));

    expect(result.current[0]).toBe(testValue);
  });

  it("should set a new value in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "default"));

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(JSON.parse(window.localStorage.getItem("testKey"))).toBe("newValue");
  });
});
