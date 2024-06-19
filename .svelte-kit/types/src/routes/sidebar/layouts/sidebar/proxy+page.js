// @ts-nocheck
import * as dashboard from '../../../sidebar/dashboard/+page';

/** @param {Parameters<import('../../dashboard/$types').PageLoad>[0]} request */
export function load(request) {
	return dashboard.load(request);
}
