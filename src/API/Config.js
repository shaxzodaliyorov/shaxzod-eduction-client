import axios from "axios";
export const api = "https://shaxzod.onrender.com/api";
export const API = axios.create({
  baseURL: api,
});
