import axios from 'axios';
import {
	getAccessToken,
	getRefreshToken,
	saveToken
} from './helpers/tokenStorage';

export const baseURL = process.env.REACT_APP_API_URL;
// export const baseURL = 'http://43f0c4a39526.ngrok.io/';
// export const baseURL = 'http://192.168.64.94:81/';
// export const baseURL = 'https://evennonapi.conveyor.cloud/';
// export const baseURL = 'http://api.evennon.sitesstage.com/';
// export const baseURL = 'http://sloncarski.sitesstage.com:5000/';

const instance = axios.create({
	baseURL: baseURL
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

instance.interceptors.response.use(
	response => response,
	error => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			!originalRequest._retry &&
			!error.response.data.isLoginAttempt
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(token => {
						originalRequest.headers['Authorization'] = 'Bearer ' + token;
						return axios(originalRequest);
					})
					.catch(err => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			const refreshToken = getRefreshToken();
			const accessToken = getAccessToken();
			return new Promise((resolve, reject) => {
				axios
					.post(baseURL + 'token/refresh', {
						accessToken,
						refreshToken
					})
					.then(({ data }) => {
						saveToken(data, false);
						axios.defaults.headers.common['Authorization'] =
							'Bearer ' + data.accessToken;
						originalRequest.headers['Authorization'] =
							'Bearer ' + data.accessToken;
						processQueue(null, data.accessToken);
						resolve(axios(originalRequest));
					})
					.catch(err => {
						processQueue(err, null);
						reject(err);
					})
					.finally(() => {
						isRefreshing = false;
					});
			});
		}

		return Promise.reject(error);
	}
);

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default instance;
