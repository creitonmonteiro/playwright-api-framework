// src/core/utils/userHelper.js

/**
 * Delete user if already exists by email
 * Used to guarantee test isolation before creating a new user
 *
 * @param {UsersClient} usersClient
 * @param {string} email
 */
export async function deleteUserIfExists (usersClient, email) {
  const response = await usersClient.listUsers ();
  const body = await response.json ();

  const existingUser = body.usuarios.find (u => u.email === email);

  if (existingUser) {
    await usersClient.deleteUser (existingUser._id);
  }
}
