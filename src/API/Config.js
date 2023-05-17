import axios from "axios";
export const api = "http://localhost:4000/api";
export const API = axios.create({
  baseURL: api,
});
