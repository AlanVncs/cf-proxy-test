import { copyDomain } from '../../../../sdk/url';
import { ResponseMiddleware } from '../response';

/**
 * @title Change cookies domain
 * @description Changes cookies domain to the same of requested url (normally 'localhost') */
export const fetchTarget: ResponseMiddleware = async (request, env) => {
	const targetUrl = copyDomain(env.TARGET_ORIGIN, request.url);

	const response = await fetch(targetUrl, request);

	return new Response(response.body as BodyInit, response);
};
