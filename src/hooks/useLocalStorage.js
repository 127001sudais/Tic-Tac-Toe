import { useState } from "react";

/**
 * Custom hook to get and set values in Local Storage.
 *
 * @param {string} key - The key under which the value is stored in Local Storage.
 * @param {any} initialValue - The initial value to be used if no value is found in Local Storage for the given key.
 * @returns {Array} - An array containing the stored value, and a setter function to set the value.
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value. The initial value is retrieved from Local Storage or set to the initial value passed.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Try to get the item from Local Storage by key.
      const item = window.localStorage.getItem(key);
      // Parse the item if it exists, otherwise return the initial value.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If an error occurs, log it and use the initial value.
      console.error(`Error reading Local Storage key “${key}”:`, error);
      return initialValue;
    }
  });

  /**
   * Save value to Local Storage and update the state.
   *
   * @param {any} value - The value to be stored.
   */
  const setValue = (value) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to Local Storage by stringifying the value first.
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // If an error occurs, log it.
      console.error(`Error setting Local Storage key “${key}”:`, error);
    }
  };

  // Return the stored value, and the setter function.
  return [storedValue, setValue];
};
