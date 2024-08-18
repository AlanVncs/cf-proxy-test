import { changeCookiesDomain } from './response/changeCookiesDomain';
import { fetchTarget } from './response/fetchTarget';

export type ResponseMiddlewareReturn = Response | undefined | void;
export type ResponseMiddleware = (
	request: Request,
	env: Env,
	response?: Response
) => Promise<ResponseMiddlewareReturn> | ResponseMiddlewareReturn;

const middlewares: ResponseMiddleware[] = [
	// INSERT MIDDLEWARES HERE
	fetchTarget,
	changeCookiesDomain,
];

export const buildResponse: ResponseMiddleware = async (request, env) => {
	let newResponse = new Response();

	for (const middleware of middlewares) {
		// Updates or keeps current response if middleware return undefined/void
		newResponse = (await middleware(request, env, newResponse)) ?? newResponse;
	}

	return newResponse;
};
