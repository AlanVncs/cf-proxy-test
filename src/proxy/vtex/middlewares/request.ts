import { changeOrigin } from './request/changeOrigin';
import { fixAuthRequestBody } from './request/fixAuthRequestBody';
import { removeCFHeaders } from './request/removeCFHeaders';
import { removeHopHeaders } from './request/removeHopHeaders';

export type RequestMiddlewareReturn = Request | undefined | void;
export type RequestMiddleware = (request: Request, env: Env) => Promise<RequestMiddlewareReturn> | RequestMiddlewareReturn;

const middlewares: RequestMiddleware[] = [
	// INSERT MIDDLEWARES HERE
	changeOrigin,
	removeCFHeaders,
	removeHopHeaders,
	fixAuthRequestBody,
];

export const buildRequest: RequestMiddleware = async (request, env) => {
	let newRequest = new Request(request);

	for (const middleware of middlewares) {
		// Updates or keeps current request if middleware return undefined/void
		newRequest = (await middleware(newRequest, env)) ?? newRequest;
	}

	return newRequest;
};
