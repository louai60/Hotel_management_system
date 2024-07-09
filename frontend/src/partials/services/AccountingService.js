import axios from 'axios';

const API_URL = 'http://localhost:8080/api/accounting';

export const getAccountingRecords = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching accounting records', error);
        throw error;
    }
};
