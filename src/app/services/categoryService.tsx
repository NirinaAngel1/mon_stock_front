import api from "@/app/services/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/categories';

export const getAllCategories = async () => {
    const response = await api.get(API_BASE_URL);
    return response.data;
}

export const getCategoryById = async (id:number) => {
    const res = await api.get(`${API_BASE_URL}/${id}`);
    return res.data;
}

export const createCategory = async (categoryData : any) => {
    const res = await api.post(API_BASE_URL, categoryData);
    return res.data;
}

export const updateCategory = async (id:number, categoryData:any) => {
    const res = await api.put(`${API_BASE_URL}/${id}`, categoryData);
    return res.data;
}

export const deleteCategory = async (id:number) => {
    const res = await api.delete(`${API_BASE_URL}/${id}`);
    return res.data;
}
