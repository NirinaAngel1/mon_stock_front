import api from "@/app/services/api";


export const getMonthlyStats = async() => {
    const res = await api.get('/dashboard/stats/monthly');
    return res.data;
}

export const getDashboard = async()=>{
    const resultat = await api.get('/dashboard');
    return resultat.data;
}

export const getCriticalsProducts = async() => {
    const critical = await api.get('/dashboard/criticals-products');
    return critical.data;
}

export const getStock = async()=>{
    const res = await api.get('/dashboard/stock');
    return res.data;
}