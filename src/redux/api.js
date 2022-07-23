import axios from 'axios';
import Cookies from 'js-cookie';

// for live server
const API = axios.create({
  baseURL: 'https://aspire0.herokuapp.com/',
});

// Blogs
export const getAllBlogs = () => API.get('/blog/getAllBlog');
export const addBlog = (data) => API.post('/blog/addBlog', data);
export const deleteBlog = (blogid) =>
  API.post('blog/deleteBlog', { id: blogid });
export const getblog = (blogid) =>
  API.post('/blog/getBlogById', { id: blogid });
export const updateBlog = (data) => API.post('/blog/updateBlog', data);

//
API.interceptors.request.use((req) => {
  if (Cookies.get('fanstarAdmin')) {
    req.headers['authorization'] = `Bearer ${Cookies.get('fanstarAdmin')}`;
  }
  return req;
});

export const login = (loginData) =>
  API.post('/api/admin/public/login', loginData);

export const appVisits = () => API.get('/api/admin/private/gettotalappvisits');
export const totalSubscriptions = () =>
  API.get('/api/admin/private/gettotalsubscribers');

// Artists
export const getArtistList = (searchInput = '') =>
  API.post('/api/admin/private/getlistofartists', { field: searchInput });
export const createArtist = (formData) =>
  API.post('/api/admin/private/createartist', formData);
export const getAnArtist = (id) =>
  API.get(`/api/admin/private/getanartist/${id}`);
export const getArtistsOfAnEmployee = (id) =>
  API.get(`/api/admin/private/getartistsofanemployee/${id}`);

export const totalAndPendingOrdersForArtist = (id) =>
  API.get(`/api/admin/private/getordersofartist/${id}`);

export const allPaymentForArtist = (id) =>
  API.get(`/api/admin/private/getpayments/${id}`);

export const blockAndUnBlockArtist = (id) =>
  API.put('/api/admin/private/blockunblockartist', { artistId: id });

export const deleteAnArtist = (id) =>
  API.delete(`/api/admin/private/deleteanartist/${id}`);

export const EditArtist = (id) =>
  API.get(`/api/admin/private/generatetokenofanartist/${id}`);

export const addArtistAccount = (id, formData) =>
  API.put(`api/admin/private/addartistaccount/${id}`, formData);

export const fetchWithdraws = (id) =>
  API.get(`/api/admin/private/getwithdrawals/${id}`);

export const payToArtist = (formData) =>
  API.put(`/api/admin/private/updateanartistbalance/`, formData);

// Employee
export const getEmployeeList = (searchInput = '') =>
  API.post('/api/admin/private/getlistofemployees', { field: searchInput });
export const getAnEmployee = (id) =>
  API.get(`/api/admin/private/getanemployee/${id}`);

export const addEmployeeAccount = (id, formData) =>
  API.put(`api/admin/private/addemployeeaccount/${id}`, formData);

export const createEmployee = (formData) =>
  API.post('/api/admin/private/createemployee', formData);

export const blockAndUnBlockEmployee = (id) =>
  API.put('/api/admin/private/blockunblockemployee', { employeeId: id });

export const deleteAnEmployee = (id) =>
  API.delete(`/api/admin/private/deleteanemployee/${id}`);

export const allPaymentForEmployee = (id) =>
  API.get(`/api/admin/private/getpaymentsofartistsofemployee/${id}`);

export const getUserList = () => API.get('/api/admin/private/getallusers');
export const getPaymentList = (searchInput) =>
  API.post('/api/admin/private/getallpayments', { field: searchInput });
export const blockUnblockUser = (id) =>
  API.put('/api/admin/private/blockunblockuser', {
    userId: id,
  });
