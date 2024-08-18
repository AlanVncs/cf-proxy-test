import { ResponseMiddleware } from '../response';

/**
 * @title Change cookies domain
 * @description Changes cookies domain to the same of requested url (normally 'localhost') */
export const changeCookiesDomain: ResponseMiddleware = (request, env, response) => {
	if (!response) return;

	const { host: localDomain } = new URL(request.url);
	const { host: targetDomain } = new URL(env.TARGET_ORIGIN);

	const strCookies = [...response.headers.getSetCookie()];
	response.headers.delete('set-cookie');

	for (const strCookie of strCookies) {
		response.headers.set('set-cookie', strCookie.replaceAll(targetDomain, localDomain));
	}
};
