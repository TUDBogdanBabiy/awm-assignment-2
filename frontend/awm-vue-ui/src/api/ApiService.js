import axios from "axios";

const API_SERVICE_DEFAULT_OPTS = {
  apiUrl: process.env.API_URL,
  resource: ""
};

class ApiService {
  constructor(opts) {
    const { apiUrl, resource, headers } = {
      ...API_SERVICE_DEFAULT_OPTS,
      ...opts
    };
    const baseURL = `${apiUrl}/${resource}`;
    this.axios = axios.create({
      baseURL,
      headers: {
        Accept: "application/json",
        ...headers
      }
    });
  }
  async _request(opts) {
    try {
      const response = await this.axios.request(opts);
      if (response) return response.data;
    } catch (e) {
      throw { message: e.response.data };
    }
  }
  create(data, opts = {}) {
    return this._request({
      ...opts,
      method: "post",
      data
    });
  }
  async list(opts = {}) {
    const data = await this._request({
      ...opts,
      method: "get"
    });

    return data;
  }
  post(slug, data, opts = {}) {
    return this._request({
      ...opts,
      method: "post",
      url: `/${slug}`,
      data
    });
  }
  get(slug, opts = {}) {
    return this._request({
      ...opts,
      method: "get",
      url: `/${slug}`
    });
  }
  update(slug, data, opts = {}) {
    return this._request({
      ...opts,
      method: "put",
      data,
      url: `/${slug}`
    });
  }
  delete(slug, opts = {}) {
    return this._request({
      ...opts,
      method: "delete",
      url: `/${slug}`
    });
  }
}

export default ApiService;
