import { RequestMiddleware } from '../request';

// cf-headers are not ASCII-compliant
export const removeCFHeaders: RequestMiddleware = (request) => {
	request.headers.forEach((_value, key) => {
		if (key.startsWith('cf-')) {
			request.headers.delete(key);
		}
	});
};
