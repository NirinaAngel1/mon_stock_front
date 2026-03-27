import api from "@/app/services/api";

export const getAllProducts = async (page: number = 1, search: string = "") => {
    const res = await api.get(`/products?page=${page}&q=${search}`);
    return res.data;
}

export const getProductById = async (id:number) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
}

export const createProduct = async (productData : any) => {
    const res = await api.post('/products', productData);
    return res.data;
}

export const getAllCategories = async () => {
    const res = await api.get('/categories');
    return res.data;
}

export const updateProduct = async (id:number, productData:any) => {
    const res = await api.put(`/products/${id}`, productData);
    return res.data;
}

export const deleteProduct = async (id:number) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
}