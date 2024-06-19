// src/lib/utils.js

/**
 * Converts a given string into a URL-friendly slug.
 * This function will:
 * 1. Convert the string to lowercase.
 * 2. Replace spaces with hyphens.
 * 3. Remove any non-alphanumeric characters (excluding hyphens).
 *
 * @param {string} str - The string to be converted into a slug.
 * @returns {string} The resulting slug.
 */
export function generateSlug(str) {
	// Convert the string to lowercase
	return (
		str
			.toLowerCase()
			// Replace spaces with hyphens
			.replace(/ /g, '-')
			// Remove any characters that are not letters, numbers, or hyphens
			.replace(/[^\w-]+/g, '')
	);
}
