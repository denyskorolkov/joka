export function getArray(value: any): any[] {
	if (Array.isArray(value)) {
		return value;
	} else {
		return [value];
	}
}
