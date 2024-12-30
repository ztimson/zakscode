const devMode = location?.port == '5173';

export const environment = {
	apiUrl: devMode ? 'http://localhost' : location.origin,
	devMode
}
