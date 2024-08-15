import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const INSTANCE_ID = process.env.REACT_APP_INSTANCE_ID;

let accessToken = '';
let refreshToken = '';

export const initializeTokens = (initialAccessToken: string, initialRefreshToken: string) => {
  accessToken = initialAccessToken;
  refreshToken = initialRefreshToken;
};

export const getNewAccessToken = async (): Promise<string> => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/user/access-token`,
      data: {},
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    
    accessToken = response.data.accessToken;
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to refresh access token', error.response?.data);
    } else {
      console.error('An unexpected error occurred', error);
    }
    accessToken = '';
  }
  return accessToken;
};

const apiCall = async (method: 'get' | 'post', endpoint: string, data?: any): Promise<any> => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        await getNewAccessToken();
        return apiCall(method, endpoint, data);
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};

export const sendMessage = async (toFrom: string, id: string, message: string): Promise<any> => {
  const refId = id;
  const endpoint = `/queue/in/web/${INSTANCE_ID}`;
  const data = {
    toFrom,
    message,
    refId,
  };

  return await apiCall('post', endpoint, data);
};
