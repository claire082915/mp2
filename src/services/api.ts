import axios from 'axios';
import type { ApiResponse, JellyBean } from '../types/bean';

const API_URL = 'https://jellybellywikiapi.onrender.com/api';

export const fetchAllBeans = async (): Promise<JellyBean[]> => {
    const response = await axios.get<ApiResponse>(`${API_URL}/Beans?pageSize=100`);
    return response.data.items;
}

export const fetchBeanById = async (id: number): Promise<JellyBean> => {
    const response = await axios.get<JellyBean>(`${API_URL}/Beans/${id}`);
    return response.data;
}