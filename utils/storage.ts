import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieves an item from AsyncStorage, parses it, and returns the parsed value.
 *
 * @param {string} item - The key of the item to retrieve from AsyncStorage.
 * @returns {Promise<unknown|null>} The parsed value from storage, or null if the item doesn't exist.
 *
 * @example
 * // Returns parsed user data or null if no user is found.
 * const user = await getFromStorage('user');
 */
export const getFromStorage = async (item: string) => {
  const storedUser = await AsyncStorage.getItem(item);
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};

/**
 * Saves an item to AsyncStorage after stringifying the value.
 *
 * @param {string} item - The key under which the value will be stored.
 * @param {unknown} value - The value to store in AsyncStorage.
 * @returns {Promise<void>} Resolves when the item has been successfully saved.
 *
 * @example
 * // Saves user data to AsyncStorage
 * await setToStorage('user', { name: 'Caio', age: 30 });
 */
export const setToStorage = async (
  item: string,
  value: unknown
): Promise<void> => {
  await AsyncStorage.setItem(item, JSON.stringify(value));
};
