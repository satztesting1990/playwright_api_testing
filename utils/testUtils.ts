/* String format.
* @param str String, needs to be formatted.
* @param args Arguments, needs to be placed properly in the string.
*/

export const stringFormat = (str: string, ...args: any[]) =>
    str.replace(/{(\d+)}/g, (match: any, index: string | number) => args[index].toString() || "");

