export function getRequest(input: RequestInfo | URL, init?: RequestInit) {
	return input instanceof Request ? input : new Request(input, init);
}
