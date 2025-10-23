import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use static adapter for better performance
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		// Enable prerendering for better SEO
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			handleEntryGeneratorMismatch: 'warn'
		},
		// Configure paths
		paths: {
			base: process.env.NODE_ENV === 'production' ? '' : '',
			relative: false
		}
	}
};

export default config;
