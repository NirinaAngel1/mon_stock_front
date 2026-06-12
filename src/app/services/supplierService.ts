import api from "@/app/services/api";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/suppliers';

export const getAllSuppliers = async () => {
    const response = await api.get(API_BASE_URL);
    return response.data;
}

export const getSupplierById = async (id:number) => {
    const res = await api.get(`${API_BASE_URL}/${id}`);
    return res.data;
}

export const createSupplier = async (supplierData : any) => {
    const res = await api.post(API_BASE_URL, supplierData);
    return res.data;
}

export const updateSupplier = async (id:number, supplierData:any) => {
    const res = await api.put(`${API_BASE_URL}/${id}`, supplierData);
    return res.data;
}

export const deleteSupplier = async (id:number) => {
    const res = await api.delete(`${API_BASE_URL}/${id}`);
    return res.data;
}