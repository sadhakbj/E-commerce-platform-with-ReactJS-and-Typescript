import Axios, { AxiosInstance } from "axios"

class Api {
  private readonly http: AxiosInstance

  constructor() {
    this.http = Axios.create({
      baseURL: process.env.REACT_APP_API_URL || "https://fakestoreapi.com",
      timeout: 45000,
    })
  }

  get(endpoint, query = {}) {
    this.setAuthToken()
    return this.http.get(endpoint, {
      params: query,
    })
  }

  post(endpoint, data) {
    this.setAuthToken()
    return this.http.post(endpoint, data)
  }

  setAuthToken() {
    this.http.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
  }
}

export default new Api()
