import proxy from './proxy/vtex';

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
	const response = await proxy(request, env);

	if (typeof response === 'undefined') return new Response('Erro ao montar a requisição');

	return response;
};
