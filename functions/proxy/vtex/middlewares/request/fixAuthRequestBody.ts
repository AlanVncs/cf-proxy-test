import { relative } from '../../../../sdk/url';
import { RequestMiddleware } from '../request';

const DEFAULT_CALLBACK_PATH = '/api/vtexid/oauth/finish?popup=true';
const DEFAULT_RETURN_PATH = '/';

/**
 * @description Fixes request body when requested url path is '/api/vtexid/pub/authentication/start'
 */
export const fixAuthRequestBody: RequestMiddleware = async (request, env) => {
	const { pathname, origin } = new URL(request.url);

	// TODO Test with GET requests
	if (!pathname.startsWith('/api/vtexid/pub/authentication/start')) return;

	const bodyText = await request.text();
	const searchParams = new URLSearchParams(bodyText);

	const callbackUrlValue = searchParams.get('callbackUrl') || DEFAULT_CALLBACK_PATH;
	const returnUrlValue = searchParams.get('returnUrl') || DEFAULT_RETURN_PATH;

	const callbackUrl = relative(new URL(callbackUrlValue, env.TARGET_ORIGIN));
	const returnUrl = relative(new URL(returnUrlValue, env.TARGET_ORIGIN));

	searchParams.set('callbackUrl', callbackUrl.toString());
	searchParams.set('returnUrl', returnUrl.toString());

	return new Request(request, { body: searchParams.toString() });
};
