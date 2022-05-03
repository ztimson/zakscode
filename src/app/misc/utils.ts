/**
 * Use with await to pause the script for a specified amount of time (in miliseconds).
 *
 * **Example:**
 * ```
 * async () => {
 *     ...
 *     await sleep(1000) // Wait 1 second
 *     ...
 * }
 * ```
 *
 * @param {number} ms - Time to pause in miliseconds
 * @returns {Promise<unknown>} - Promise you should await
 */
export function sleep(ms: number) {
	return new Promise(res => setTimeout(res, ms));
}
