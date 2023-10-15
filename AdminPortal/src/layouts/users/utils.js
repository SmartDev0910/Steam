export const getRoleColor = (role) => {
  switch (role) {
    case "Sponsor":
      return "warning";
    case "Marketplace Partner":
      return "info";
    case "Super Admin":
      return "dark";
    case "Admin":
      return "success";
    default:
      return "info";
  }
};
