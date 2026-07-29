export function hashPassword(password: string) {
  // Local-only demo hash (not for production auth).
  return btoa(`angel-starch::${password.trim()}`);
}
