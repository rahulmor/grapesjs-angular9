import * as jQuery from 'jquery';

/**
 *  Utility Service for misc. utilities
 *  Contains all static methods
 */

export class UtilityService {

	static isNumber(o) {
		return !isNaN(o - 0) && o != null;
	}

	static isInfinite(number) {
		if (number === Infinity) {
			return true;
		} else {
			return false;
		}
	}

	static toJson(string) {
		return JSON.parse(string);
	}

	static stringify(string) {
		return JSON.stringify(string);
	}

	static toInt(string) {
		return parseInt(string);
	}

	static convertPixelToInt(string) {
		return parseInt(string,10);
	}

	static isNull(o) {
		return (o === null)
	}

	static isUndefined(obj) {
		return typeof obj === "undefined";
	}

	static isUndefinedOrNull(obj) {
		return typeof obj === "undefined" || obj === null;
	}

	static isEmptyOrNull(obj) {
		return (obj == "" || obj == null);
	}

	static toTrueOrFalse(value) {
		if (typeof value != "boolean")
			return !!this.toInt(value);
		return value;
	}
}
