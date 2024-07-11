import axios from 'axios';

const API_URL = 'http://localhost:8080/api/revenues';

class RevenueService {
  getAllRevenues() {
    return axios.get(API_URL);
  }

  getRevenueById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createRevenue(revenue) {
    return axios.post(API_URL, revenue);
  }

  updateRevenue(id, revenue) {
    return axios.put(`${API_URL}/${id}`, revenue);
  }

  deleteRevenue(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new RevenueService();
