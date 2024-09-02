"use strict";
/*
 * File: _common.js
 * Desc: Contains common resources and functions that are initialized in a per-page basis instead of globally and can be used project-wide.
 * Deps: jQuery, /_functions.js
 * Copyright (c) 2024 Andrés Trujillo [Mateus] byUwUr
 */

/**
 * Initializes the global `byCommon` object and assigns its properties.
 * This IIFE (Immediately Invoked Function Expression) ensures the `byCommon` object exists globally
 * (typically on `window` in a browser) to avoid pollution and conflicts in the global namespace.
 * @param {Object} global - The global object, usually `window` in a browser.
 */
(function (global) {
	global.byCommon = global.byCommon || {};
	const byCommon = global.byCommon;

	// Common selectors
	byCommon.SIDEBAR_ID = "#sidebar";
	byCommon.SIDERBAR_TOGGLE_ID = "#sidebar-toggle";
	byCommon.SIDEBAR_HIDDEN_ID = "#sidebar-hidden";
	byCommon.APP_CONTAINER_SELECTOR = ".app-container";

	/**
	 * Initializes the <Sidebar /> component in #spa-nav.
	 */
	byCommon.initSidebar = function () {
		// Check it exists in the first place. Duh..
		const jqSidebar = $(byCommon.SIDEBAR_ID);
		if (!jqSidebar.length) return;
		console.log("Init <Sidebar />");
		if (!get_cookie("SidebarExpand")) set_cookie("SidebarExpand", "on");
		// Init the rest of the elements
		const jqSidebarToggle = $(byCommon.SIDERBAR_TOGGLE_ID);
		const jqSidebarHidden = $(byCommon.SIDEBAR_HIDDEN_ID);
		const jqAppContainer = $(byCommon.APP_CONTAINER_SELECTOR);
		// Ensure the overlay inside the sidebar follows it accordingly, due to being an absolute positioned inside another
		jqSidebar
			.off("scroll")
			.on(
				"scroll",
				(function () {
					let sidebarScrollTop = 0;
					return debounce(function () {
						const top = Math.floor($(this).scrollTop()),
							diff = top - sidebarScrollTop;
						console.log(top);
						if (jqSidebar.hasClass("sidebar-expanded")) $(`${byCommon.SIDEBAR_ID} .overlay`).css("height", `${$(`${byCommon.SIDEBAR_ID} .overlay`).height() + diff}px`);
						sidebarScrollTop = top;
					});
				})()
			)
			// Ensure the sidebar collapses when the mouse leaves the sidebar itself
			.off("mouseleave")
			.on("mouseleave", function () {
				if (!jqSidebarToggle.hasClass("sidebar-expanded")) jqSidebar.removeClass("sidebar-expanded");
			});
		// Toggle sidebar expansion when the sidebar toggle button is clicked
		jqSidebarToggle.off("click").on("click", function () {
			jqSidebarToggle.trigger("blur");
			$("#sidebar .overlay").css("height", "");
			if (!jqSidebarToggle.hasClass("sidebar-expanded")) {
				jqSidebarToggle.addClass("sidebar-expanded");
				jqSidebar.addClass("sidebar-expanded");
				jqAppContainer.addClass("sidebar-expanded");
				jqSidebarHidden.css("display", "none");
				set_cookie("SidebarExpand", "on");
			} else {
				jqSidebarToggle.removeClass("sidebar-expanded");
				jqSidebar.removeClass("sidebar-expanded");
				jqAppContainer.removeClass("sidebar-expanded");
				jqSidebarHidden.css("display", "flex");
				jqSidebar.scrollTop(0);
				set_cookie("SidebarExpand", "off");
			}
		});
		// Expand sidebar when the hidden sidebar area is hovered
		jqSidebarHidden.off("mouseenter").on("mouseenter", function () {
			if (!jqSidebarToggle.hasClass("sidebar-expanded")) jqSidebar.addClass("sidebar-expanded");
		});
		// Collapse sidebar when the mouse leaves the hidden sidebar area
		jqSidebarHidden.off("mouseleave").on("mouseleave", function () {
			if (!jqSidebarToggle.hasClass("sidebar-expanded") && !jqSidebar.is(":hover")) jqSidebar.removeClass("sidebar-expanded");
		});
		// Expand the sidebar automatically on larger screens (min-width: 768px)
		if (window.innerWidth > 768 && get_cookie("SidebarExpand") == "on") {
			jqSidebarToggle.addClass("sidebar-expanded");
			jqSidebar.addClass("sidebar-expanded");
			jqAppContainer.addClass("sidebar-expanded");
		}
	};

	/**
	 * Initializes all components that dynamically changes within the page
	 */
	byCommon.init = function () {
		if (typeof jQuery === "undefined" && window.jQuery === undefined) return console.error("Init _common.js FAILED. No jQuery found.");
		console.log("Init _common.js");
		this.initSidebar();
	};
})(typeof window !== "undefined" ? window : this);
