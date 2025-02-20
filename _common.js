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
	byCommon.SIDEBAR_ID = "#bywr-sidebar";
	byCommon.SIDERBAR_TOGGLE_ID = "#bywr-sidebar-toggle";
	byCommon.SIDEBAR_HIDDEN_ID = "#bywr-sidebar-hidden";
	byCommon.APP_CONTAINER_SELECTOR = ".app-container";

	/**
	 * Initializes the <Sidebar /> component in #spa-nav.
	 */
	byCommon.initSidebar = function () {
		// Check it exists in the first place. Duh..
		const jqSidebar = $(byCommon.SIDEBAR_ID);
		if (!jqSidebar.length) return console.warn("Can't load Sidebar if element ain't present.");
		console.log("Init <Sidebar />");
		if (!get_cookie("SidebarExpand")) set_cookie("SidebarExpand", "on");
		// Init the rest of the elements
		const jqSidebarToggle = $(byCommon.SIDERBAR_TOGGLE_ID);
		if (!jqSidebarToggle.length) console.warn(`Can't load Sidebar Element: "jqSidebarToggle". It doesn't exist.`);
		const jqSidebarHidden = $(byCommon.SIDEBAR_HIDDEN_ID);
		if (!jqSidebarHidden.length) console.warn(`Can't load Sidebar Element: "jqSidebarHidden". It doesn't exist.`);
		const jqAppContainer = $(byCommon.APP_CONTAINER_SELECTOR);
		if (!jqAppContainer.length) console.warn(`Can't load Sidebar Element: "jqAppContainer". It doesn't exist.`);
		// Ensure the overlay inside the sidebar follows it accordingly, due to being an absolute positioned inside another
		jqSidebar
			.off("scroll")
			.on("scroll", function () {
				const overlay = $(this).find(".overlay");
				if ($(overlay).length) $(overlay).height(`${this.scrollHeight}px`);
			})
			// Ensure the sidebar collapses when the mouse leaves the sidebar itself
			.off("mouseleave")
			.on("mouseleave", function () {
				if (!jqSidebarToggle.hasClass("bywr-sidebar-expanded")) jqSidebar.removeClass("bywr-sidebar-expanded");
			});
		// Toggle sidebar expansion when the sidebar toggle button is clicked
		jqSidebarToggle.off("click").on("click", function () {
			jqSidebarToggle.trigger("blur");
			$("#bywr-sidebar .overlay").css("height", "");
			if (!jqSidebarToggle.hasClass("bywr-sidebar-expanded")) {
				jqSidebarToggle.addClass("bywr-sidebar-expanded");
				jqSidebar.addClass("bywr-sidebar-expanded");
				jqAppContainer.addClass("bywr-sidebar-expanded");
				set_cookie("SidebarExpand", "on");
			} else {
				jqSidebarToggle.removeClass("bywr-sidebar-expanded");
				jqSidebar.removeClass("bywr-sidebar-expanded");
				jqAppContainer.removeClass("bywr-sidebar-expanded");
				jqSidebar.scrollTop(0);
				set_cookie("SidebarExpand", "off");
			}
		});
		// Expand sidebar when the hidden sidebar area is hovered
		jqSidebarHidden.off("mouseenter").on("mouseenter", function () {
			$("#bywr-sidebar .overlay").css("height", "");
			if (!jqSidebarToggle.hasClass("bywr-sidebar-expanded")) jqSidebar.addClass("bywr-sidebar-expanded");
		});
		// Collapse sidebar when the mouse leaves the hidden sidebar area
		jqSidebarHidden.off("mouseleave").on("mouseleave", function () {
			$("#bywr-sidebar .overlay").css("height", "");
			if (!jqSidebarToggle.hasClass("bywr-sidebar-expanded") && !jqSidebar.is(":hover")) jqSidebar.removeClass("bywr-sidebar-expanded");
		});
		// Expand the sidebar automatically on larger screens (min-width: 768px)
		if (window.innerWidth > 768 && get_cookie("SidebarExpand") == "on") {
			jqSidebarToggle.addClass("bywr-sidebar-expanded");
			jqSidebar.addClass("bywr-sidebar-expanded");
			jqAppContainer.addClass("bywr-sidebar-expanded");
		}
	};

	/**
	 * Initializes all components that dynamically changes within the page
	 */
	byCommon.init = function () {
		if (typeof jQuery === "undefined" && window.jQuery === undefined) return console.error("Init _common.js FAILED. No jQuery found.");
		$(() => {
			console.log("Init _common.js");
			byCommon.initSidebar();
		});
	};
})(typeof window !== "undefined" ? window : this);
