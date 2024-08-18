import { RequestMiddleware } from '../request';

const HOP_BY_HOP_HEADERS = [
	'Keep-Alive',
	'Transfer-Encoding',
	'TE',
	'Connection',
	'Trailer',
	'Upgrade',
	'Proxy-Authorization',
	'Proxy-Authenticate',
];

export const removeHopHeaders: RequestMiddleware = (request) => {
	HOP_BY_HOP_HEADERS.forEach((h) => request.headers.delete(h));
};
