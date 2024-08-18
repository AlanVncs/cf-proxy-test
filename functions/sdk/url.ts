export function relative(url: string | URL) {
	const { pathname, search, hash } = new URL(url);
	return `${pathname}${search}${hash}`;
}

export function copyDomain(from: string | URL, to: string | URL) {
	const { host, protocol, port } = new URL(from);
	const toURL = new URL(to);

	toURL.host = host;
	toURL.protocol = protocol;
	toURL.port = port;

	return toURL;
}
