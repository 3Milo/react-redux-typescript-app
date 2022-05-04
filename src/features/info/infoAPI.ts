export function fetchInfo(login: string): Promise<any> {
  return new Promise((resolve) =>
    fetch(`https://api.github.com/users/${login}`)
      .then(response => response.json())
      .then(data => resolve(data))
  );
}
