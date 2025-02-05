export const EndPoints = {
  USERS: {
    LIST: "/users",
    GET: "/users/:id",
    LOGIN: "/users/login",
    LOGOUT: "/users/logout",
    RESET_PASSWORD: "/users/reset-password",
    UPDATE_RESETED_PASSWORD: "/users/update-reseted-password",
    UPDATE_PROFILE_PASSWORD: "/users/profile/password",
    PROFILE: "/users/profile",
    CREATE: "/users",
    UPDATE: "/users/:id",
    DELETE: "/users/:id",
  },

  PERMISSIONS: {
    LIST: "/permissions",
  },

  COMPANIES: {
    PROFILE: "/companies/profile",
    LIST: "/companies",
    GET: "/companies/:id",
    UPDATE: "/companies/:id",
    CREATE: "/companies",
    USERS_LIST: "/companies/users",
    USER_UPDATE: "/companies/users/:id",
  },

  CATEGORIES: {
    LIST: "/categories",
    GET: "/categories/:id",
    UPDATE: "/categories/:id",
    CREATE: "/categories",
  },

  PRODUCTS: {
    LIST: "/products",
    GET: "/products/:id",
    UPDATE: "/products/:id",
    CREATE: "/products",
  },

  CLIENTS: {
    LIST_COMPANIES: "/clients/company",
    LIST_CATEGORIES: "/clients/categories",
    LIST_PRODUCTS: "/clients/products",
    LIST_COMPANY_PROFILE: "/clients/company/profile",
  }
};
