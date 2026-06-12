import api from "@/app/services/api";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/orders';

export const getOrders = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    throw error;
  }
};

export const getOrderById = async (id: number) => {
  try {
    const response = await api.get(`${API_BASE_URL}/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la commande n° ${id} :`, error);
    throw error;
  }
};

export const createOrder = async (orderData: {type:string; lines: Array<{productId: number; quantity: number}>}) => {
  try {
    const response = await api.post(`${API_BASE_URL}/`, orderData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    throw error;
  }
};

export const submitOrder = async (id: number) => {
  try {
    const response = await api.post(`${API_BASE_URL}/${id}/submit/`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la soumission de la commande n° ${id} :`, error);
    throw error;
  }
};

export const validateOrder = async (id: number) => {
  try {
    const response = await api.post(`${API_BASE_URL}/${id}/validate/`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la validation de la commande n° ${id} :`, error);
    throw error;
  }
};

export const cancelOrder = async (id: number) => {
  try {
    const response = await api.post(`${API_BASE_URL}/${id}/cancel/`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de l'annulation de la commande n° ${id} :`, error);
    throw error;
  }
};

export const deleteOrder = async (id: number) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la commande n° ${id} :`, error);
    throw error;
  }
};

