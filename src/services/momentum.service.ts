import {environment} from '@/environments/environment';
import {Momentum} from '@ztimson/momentum';
import {PathEvent} from '@ztimson/utils';
import {ref, onUnmounted} from 'vue';

export function mRef<T>(event: string, get: (event?: PathEvent, ...args: any[]) => T | Promise<T>): any;
export function mRef<T>(event: string, init: () => T | Promise<T>, get: (event: PathEvent, ...args: any[]) => T | Promise<T>): any;
export function mRef<T>(event: string, fn1: (...args: any[]) => T | Promise<T>, fn2?: (event: PathEvent, ...args: any[]) => T | Promise<T>): any {
	// Init
	const resp = fn1(), promise = resp instanceof Promise;
	const r = ref<T | null>(promise ? null : resp);
	if(promise) resp.then(v => r.value = v);

	// Get
	const get = fn2 || fn1;
	mWatch(event, async (event, ...args) => r.value = await get(<any>event, ...args));
	return r;
}

export function mWatch(event: string, get: (event?: PathEvent, ...args: any[]) => any) {
	const unsubscribe = momentum.on(event, get);
	onUnmounted(() => unsubscribe());
}

export const momentum = new Momentum(environment.apiUrl, {
	app: "ZaksCode",
	analytics: "prompt",
	logLevel: "ERROR",
});

momentum.auth.on('logout', () => location.reload());
