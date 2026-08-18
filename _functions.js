"use strict";
/*
 * File: _functions.js
 * Desc: Contains common standalone functions that are used project-wide. In hopes that the function names doesn't collide with global.
 * Deps: jQuery
 * Copyright (c) 2025 Andrés Trujillo [Mateus] byUwUr
 */

/**
 * Creates or updates a cookie with the specified name, value, and expiration days.
 * @param {string} name The name of the cookie.
 * @param {string} value The value of the cookie.
 * @param {number} [seconds=31536000] (Default 1y) The number of seconds until the cookie expires. A negative number expires the cookie.
 */
function set_cookie(name, value, seconds = 31536000) {
  document.cookie = `${name}=${encodeURIComponent(value)};max-age=${seconds};path=/`;
}

/**
 * Retrieves the value of the cookie with the specified name.
 * @param {string} name The name of the cookie to retrieve.
 * @return {string | null} The value of the cookie or null if not found.
 */
function get_cookie(name) {
  return `; ${document.cookie}`.split(`; ${name}=`).pop().split(";").shift() || null;
}
