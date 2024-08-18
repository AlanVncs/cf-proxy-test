import { copyDomain } from '../../../../sdk/url';
import { RequestMiddleware } from '../request';

export const changeOrigin: RequestMiddleware = (request, env) => {
	const { host: localHost } = new URL(request.url);
	const targetUrl = copyDomain(env.TARGET_ORIGIN, request.url);

	request.headers.set('origin', targetUrl.origin);
	request.headers.set('host', targetUrl.host);
	request.headers.set('referer', targetUrl.toString());
	request.headers.set('x-forwarded-host', localHost);
};
