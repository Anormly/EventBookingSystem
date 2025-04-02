// authHelpers.ts
export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
  };
  
  export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };