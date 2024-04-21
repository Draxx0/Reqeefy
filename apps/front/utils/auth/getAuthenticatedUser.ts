const getAuthenticatedUser = () => {  if (typeof window !== 'undefined') {
    const authState = localStorage.getItem('user-storage');
    console.log(authState);
    return authState ? !!JSON.parse(authState) : false;
  }
};
const AUTH_UTILS = {
  getAuthenticatedUser,
};

export { AUTH_UTILS };
