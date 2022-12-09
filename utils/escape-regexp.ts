/**
 * Escapes special characters in a string and returns a regular expression to match it
 */
export function escapeRegExp(string: string): RegExp {
    return new RegExp(string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
}