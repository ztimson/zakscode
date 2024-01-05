export const environment = {
	postMailKey: (<any>window)?.env?.APP_POSTMAIL_KEY || import.meta.env.APP_POSTMAIL_ACCESS_TOKEN,
}
