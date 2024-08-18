import proxy from './proxy/vtex/index';

interface Env {
	// KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	return new Response('OOOOOOOOOOOOOOOOOOOOOOOOOOOo');
	const response = await proxy(context.request, context.env);

	if (typeof response === 'undefined') return new Response('Erro ao montar a requisição');

	return response;
};
