export const db = {
  users: [],
  products: [],
};

export function resetDb () {
  db.users.length = 0;
  db.products.length = 0;
}
