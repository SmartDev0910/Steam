export const getRoleColor = (role) => {
  switch (role) {
    case "Admin":
      return "error";
    case "User":
      return "info";
    default:
      return "info";
  }
};
