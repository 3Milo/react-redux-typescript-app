export function fetchUsers(amount = 30): Promise<any> {
  return new Promise((resolve) =>
    fetch(`https://api.github.com/users?per_page=${amount}`)
      .then(response => response.json())
      .then(data => resolve(data))
  );
}
