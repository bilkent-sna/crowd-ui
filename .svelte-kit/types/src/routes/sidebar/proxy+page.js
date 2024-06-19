// @ts-nocheck
import * as dashboard from './dashboard/+page';

/** @param {Parameters<import('../sidebar/dashboard/$types').PageLoad>[0]} request */
export function load(request) {
	return dashboard.load(request);
}
