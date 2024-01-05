export const environment = {
	postMailKey: (<any>window)?.env?.APP_POSTMAIL_KEY || (<any>import.meta).env.APP_POSTMAIL_ACCESS_TOKEN,
}
