import { parse } from 'set-cookie-parser';
import { serialize, CookieSerializeOptions } from 'cookie';
import { ResponseMiddleware } from '../response';

/**
 * @title Change cookies domain
 * @description Changes cookies domain to the same of requested url (normally 'localhost') */
export const changeCookiesDomain: ResponseMiddleware = (request, _env, response) => {
	if (!response) return;

	const { host: localDomain } = new URL(request.url);

	const cookies = parse(response.headers.getSetCookie());
	response.headers.delete('set-cookie');

	for (const { name, value, ...remaining } of cookies) {
		const cookieStr = serialize(name, value, { ...remaining, domain: localDomain } as CookieSerializeOptions);
		response.headers.set('set-cookie', cookieStr);
	}

	// console.log('----------------------------------------------------------------------------');
	// console.log({ path: url.pathname });
	// console.log({ cookies });
	// console.log({ newCookies: parse(headers.getSetCookie()) });
	// console.log('----------------------------------------------------------------------------');

	// return { response: new Response };
};
