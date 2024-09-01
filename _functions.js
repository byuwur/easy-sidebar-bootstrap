"use strict";
/*
 * File: _functions.js
 * Desc: Contains common resources that are initialized in a per-page basis instead of globally.
 * Deps: jQuery
 * Copyright (c) 2024 Andrés Trujillo [Mateus] byUwUr
 */

/**
 * Creates or updates a cookie with the specified name, value, and expiration days.
 * @param {string} name The name of the cookie.
 * @param {string} value The value of the cookie.
 * @param {number} minutes (Default 1y) The number of days until the cookie expires. A negative number expires the cookie.
 */
function set_cookie(name, value, minutes = 31536000) {
	document.cookie = `${name}=${encodeURIComponent(value)};max-age=${minutes};path=/`;
}

/**
 * Retrieves the value of the cookie with the specified name.
 * @param {string} name The name of the cookie to retrieve.
 * @return {string | null} The value of the cookie or null if not found.
 */
function get_cookie(name) {
	return `; ${document.cookie}`.split(`; ${name}=`).pop().split(";").shift() || null;
}

/**
 * Creates a debounced function that delays the execution of the provided function (`func`)
 * @param {Function} func The function to debounce. This is the function that will be delayed in execution.
 * @param {number} wait (Default 111) The number of milliseconds to wait before executing the `func`.
 * @return {Function} Returns a new debounced version of the `func` that delays its execution.
 */
function debounce(func, wait = 250) {
	let timeout;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, arguments), wait);
	};
}
