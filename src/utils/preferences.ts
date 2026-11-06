type Preference = 'mw_lang' | 'mw_theme_v2';

export function readPreference(key: Preference) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function savePreference(key: Preference, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The selection still applies for the current visit when storage is blocked.
  }
}
