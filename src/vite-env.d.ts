/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.css' {
	const stylesheet: string
	export default stylesheet
}