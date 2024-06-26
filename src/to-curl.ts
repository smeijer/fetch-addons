import { getRequest } from './request.js';

export async function toCurl(input: string | URL, init?: RequestInit): Promise<string>;
export async function toCurl(request: Request): Promise<string>;

export async function toCurl(input: RequestInfo | URL, init?: RequestInit) {
	const request = getRequest(input, init).clone();
	const headers = Array.from(request.headers.entries());
	const data = await request.text();

	return [
		`curl --url '${request.url}'`,
		`--request '${request.method.toUpperCase()}'`,
		...headers.map(([key, value]) => `--header '${key}: ${value}'`),
		data && `--data '${data}'`,
	]
		.filter(Boolean)
		.join(' \\\n  ');
}
