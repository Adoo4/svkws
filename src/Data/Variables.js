

const BASE_URL = "http://localhost:5000/api/books";



const apiRoutes = {
  books: {
    getAll: `${BASE_URL}`,
    getOne: (id) => `${BASE_URL}/books/${id}`,
    create: `${BASE_URL}/books`,
    update: (id) => `${BASE_URL}/books/${id}`,
    delete: (id) => `${BASE_URL}/books/${id}`,
  },
  users: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
  },
  // Add more routes as needed
};

export default apiRoutes;