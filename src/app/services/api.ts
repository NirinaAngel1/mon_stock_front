import axios from "axios";

const api = axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
    headers : {
        "Content-Type" : "application/json",
    },
});

//constante pour les tokens
const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";

//intercepteur pour ajuter le jwt
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem(TOKEN_KEY);

    const publicRoutes = [
        "/login_check",
        "/register",
        "/token/refresh/"
    ];

    const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));

    if(token && config.headers && !isPublicRoute){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//intercepteur pour gérer 401 et refresh token
api.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/login_check")){
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

            if(refreshToken){
                try{
                    const { data } = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/token/refresh/`,
                        { refresh_token: refreshToken }
                    );
                    localStorage.setItem(TOKEN_KEY, data.access_token);
                    originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                    return api(originalRequest);//pour refaire la requete originale avec le nouveau token
                }
                catch(err){
                    console.error("Refresh token expiré ou invalide", err);
                    localStorage.removeItem(TOKEN_KEY);
                    localStorage.removeItem(REFRESH_TOKEN_KEY);
                    window.location.href = "/login"; //redirection vers login
                }
            }
        }
        return Promise.reject(error);
    }
)

export default api;