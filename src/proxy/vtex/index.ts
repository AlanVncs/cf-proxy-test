import { buildRequest } from './middlewares/request';
import { buildResponse } from './middlewares/response';

export default async function proxy(request: Request, env: Env) {
	const targetRequest = await buildRequest(request, env);
	if (!targetRequest) return;

	const response = await buildResponse(targetRequest, env);
	if (!response) return new Response('Erro ao montar a resposta');

	return response;
}
