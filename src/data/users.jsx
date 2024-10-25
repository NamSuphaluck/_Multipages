export const users = [
    { username: "user1", password: "pass1", token: "token1", role: "admin" },
    { username: "user2", password: "pass2", token: "token2", role: "user" },
  ];
  
  export const verifyUser = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    return user ? { token: user.token, role: user.role } : null;
  };
  