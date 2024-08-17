import { parse, serialize } from "cookie";

const HOP_BY_HOP = [
    "Keep-Alive",
    "Transfer-Encoding",
    "TE",
    "Connection",
    "Trailer",
    "Upgrade",
    "Proxy-Authorization",
    "Proxy-Authenticate",
];

const removeCFHeaders = (headers: Headers) => {
    headers.forEach((_value, key) => {
        if (key.startsWith("cf-")) {
            headers.delete(key);
        }
    });
};

export interface Props {
    request: Request;
}

export default async function proxy({ request }: Props) {
    const url = new URL(request.url);
    const { pathname, search, hash } = new URL(request.url);
    const requestHeaders = new Headers(request.headers);

    // PROXY
    const targetOrigin = "https://www.marleneenxovais.com.br"; // 'https://www.mundodoenxoval.com.br'
    const targetURL = new URL(`${pathname}${search}${hash}`, targetOrigin);
    const targetHost = targetURL.host;

    HOP_BY_HOP.forEach((h) => requestHeaders.delete(h));

    removeCFHeaders(requestHeaders); // cf-headers are not ASCII-compliant

    const requestInit: RequestInit = {
        headers: requestHeaders,
        redirect: "manual",
        signal: request.signal,
        method: request.method,
    };

    if (pathname.startsWith("/api/vtexid/pub/authentication/start")) {
        const callbackUrl =
            "https://www.marleneenxovais.com.br/api/vtexid/oauth/finish?popup=true";
        const returnUrl = "https://www.marleneenxovais.com.br/";

        const bodyText = await request.text();
        const searchParams = new URLSearchParams(bodyText);

        searchParams.set("callbackUrl", callbackUrl);
        searchParams.set("returnUrl", returnUrl);

        requestInit.body = searchParams.toString();
        console.log({ body: requestInit.body });
    }

    requestHeaders.set("origin", targetOrigin);
    requestHeaders.set("host", targetHost);
    requestHeaders.set("x-forwarded-host", targetHost);

    const response = await fetch(targetURL, requestInit);

    // Change cookies domain
    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("set-cookie");

    exchangeCookiesDomain(response.headers, responseHeaders, url);

    return new Response(response.body, {
        status: response.status,
        headers: responseHeaders,
    });
}

export const exchangeCookiesDomain = (
    sourceHeader: Headers,
    resultHeader: Headers,
    url: URL,
) => {
    const sourceCookiesStr = sourceHeader.get("set-cookie");
    if (!sourceCookiesStr) return;

    const sourceCookies = Object.entries(parse(sourceCookiesStr));

    for (const [key, value] of sourceCookies) {
        const newCookie = serialize(key, value, { domain: url.host });
        resultHeader.set("set-cookie", newCookie);
    }
};
