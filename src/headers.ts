import { getRequest } from './request.js';

export function deleteEmptyHeaders(headers: Headers) {
	// Can't do it in the headers.forEach loop, see https://twitter.com/meijer_s/status/1676506116736397312
	[...headers.entries()].forEach(([key, value]) => {
		if (value && value !== 'undefined' && value !== 'null') return;
		headers.delete(key);
	});
}

export function getHeaders(headers: HeadersInit): Headers;
export function getHeaders(input: RequestInfo | URL, init?: RequestInit): Headers;
export function getHeaders(headersOrInput: RequestInfo | URL | HeadersInit, init?: RequestInit) {
	if (typeof headersOrInput === 'string' || headersOrInput instanceof URL || headersOrInput instanceof Request) {
		return getRequest(headersOrInput, init).headers;
	}

	return headersOrInput instanceof Headers ? headersOrInput : new Headers(headersOrInput);
}
