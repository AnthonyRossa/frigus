import { BASE_URL } from "./url";
import { getToken } from "./token";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      if (res.status === 204) return null;
      return res.json();
    }
    return Promise.reject(`Error: ${res.status} ${res.statusText}`);
  }

  _makeRequest(endpoint, options = {}) {
    const token = getToken();
    if (!token) {
      return Promise.reject("No token found");
    }

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
      ...options.headers,
    };

    return fetch(`${this._baseUrl}${endpoint}`, {
      ...options,
      headers,
    }).then(this._checkResponse);
  }

  // Endpoints

  createBatch(batchData) {
    return this._makeRequest("/batches", {
      method: "POST",
      body: JSON.stringify(batchData),
    });
  }

  getBatches() {
    return this._makeRequest("/batches");
  }

  getBatchById(id) {
    return this._makeRequest(`/batches/${id}`);
  }

  updateBatch(id, batchData) {
    return this._makeRequest(`/batches/${id}`, {
      method: "PATCH",
      body: JSON.stringify(batchData),
    });
  }

  deleteBatch(id) {
    return this._makeRequest(`/batches/${id}`, {
      method: "DELETE",
    });
  }
}

const api = new Api({
  baseUrl: BASE_URL,
});

export default api;
