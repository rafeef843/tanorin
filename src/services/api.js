import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    // Check for network errors (no response) or server errors (5xx)
    if (!error.response || (error.response.status >= 500)) {
       // Dispatch a custom event that App.jsx can listen to
       window.dispatchEvent(new CustomEvent('backend-error'));
    }
    return Promise.reject(error);
  }
);

export const fetchCategories = async () => {
    try {
        const response = await api.get('/categories/');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const fetchCategory = async (slug) => {
    try {
        const response = await api.get(`/categories/${slug}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category ${slug}:`, error);
        return null;
    }
};

export const fetchProducts = async (categorySlug = null, featured = false) => {
    try {
        let url = '/products/';
        const params = {};
        if (categorySlug) params.category = categorySlug;
        if (featured) params.featured = 'true';
        
        const response = await api.get(url, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const fetchProduct = async (slug) => {
    try {
        const response = await api.get(`/products/${slug}/`);
        return response.data;
    } catch (error) {
         console.error(`Error fetching product ${slug}:`, error);
         return null;
    }
};

export const fetchNews = async (category = null, featured = false) => {
    try {
        let url = '/news/';
        const params = {};
        if (category) params.category = category;
        if (featured) params.featured = 'true';
        
        const response = await api.get(url, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};

export const fetchNewsArticle = async (slug) => {
    try {
        const response = await api.get(`/news/${slug}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching news article ${slug}:`, error);
        return null;
    }
};

export const fetchExhibitions = async () => {
    try {
        const response = await api.get('/exhibitions/');
        return response.data;
    } catch (error) {
        console.error("Error fetching exhibitions:", error);
        return [];
    }
};

export const fetchSiteContent = async () => {
    try {
        const response = await api.get('/site-content/');
        // Transform array to key-value map for easier usage? 
        // Or just return list and let App handle it. 
        // Let's return the list.
        return response.data;
    } catch (error) {
        console.error("Error fetching site content:", error);
        return [];
    }
};

export const fetchJobs = async () => {
    try {
        const response = await api.get('/jobs/');
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return [];
    }
};

export const submitApplication = async (formData) => {
    try {
        // Need to set content type to multipart/form-data for file upload if needed,
        // but axios usually handles it if we pass FormData object.
        const response = await api.post('/applications/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting application:", error);
        throw error;
    }
};

export default api;
