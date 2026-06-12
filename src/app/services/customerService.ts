import api from "@/app/services/api";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/customers';

export const getAllCustomers = async () => {
    const response = await api.get(API_BASE_URL);
    return response.data;
}

export const getCustomerById = async (id:number) => {
    const res = await api.get(`${API_BASE_URL}/${id}`);
    return res.data;
}

export const createCustomer = async (customerData : any) => {
    const res = await api.post(API_BASE_URL, customerData);
    return res.data;
}

export const updateCustomer = async (id:number, customerData:any) => {
    const res = await api.put(`${API_BASE_URL}/${id}`, customerData);
    return res.data;
}

export const deleteCustomer = async (id:number) => {
    const res = await api.delete(`${API_BASE_URL}/${id}`);
    return res.data;
}