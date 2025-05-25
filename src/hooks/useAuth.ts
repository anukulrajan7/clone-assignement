// Types
type UserData = {
  name: string;
};

type AuthData = {
  token: string;
  user: UserData;
};

// Keys for localStorage
const TOKEN_KEY = "token";
const USER_KEY = "user";

// ✅ Save token + user data
export const setAuth = (token: string, user: UserData) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// ✅ Get auth state
export const getAuth = (): AuthData | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);

  if (!token || !user) return null;

  try {
    return {
      token,
      user: JSON.parse(user),
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const removeUserCredential = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// ✅ Hook to check if user is authenticated (used in <ProtectedRoute />)
export const useAuth = (): boolean => {
  return getAuth() ? true : false;
};
