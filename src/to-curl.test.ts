import assert from 'node:assert';
import { test } from 'node:test';

import { toCurl } from './to-curl.js';

await test('can generate a curl string from Request object', async () => {
	const request = new Request('https://example.com', {
		method: 'POST',
		body: JSON.stringify({ foo: 'bar' }),
		headers: {
			'content-type': 'application/json',
		},
	});

	const curl = await toCurl(request);
	assert.equal(
		curl,
		`curl --url 'https://example.com/' \\
  --request 'POST' \\
  --header 'content-type: application/json' \\
  --data '{"foo":"bar"}'`,
	);
});

await test('can generate a curl string from RequestInit object', async () => {
	const init: RequestInit = {
		method: 'POST',
		body: JSON.stringify({ foo: 'bar' }),
		headers: {
			'content-type': 'application/json',
		},
	};

	const curl = await toCurl('https://example.com', init);
	assert.equal(
		curl,
		`curl --url 'https://example.com/' \\
  --request 'POST' \\
  --header 'content-type: application/json' \\
  --data '{"foo":"bar"}'`,
	);
});
