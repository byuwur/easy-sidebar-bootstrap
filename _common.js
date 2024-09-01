"use strict";
/*
 * File: _common.js
 * Desc: Contains common resources that are initialized in a per-page basis instead of globally.
 * Deps: jQuery, /_functions.js
 * Copyright (c) 2024 Andrés Trujillo [Mateus] byUwUr
 */

// Common selectors
const SIDEBAR_ID = "#sidebar",
	SIDERBAR_TOGGLE_ID = "#sidebar-toggle",
	SIDEBAR_HIDDEN_ID = "#sidebar-hidden",
	APP_CONTAINER_SELECTOR = ".app-container";

/**
 * Initializes the <Sidebar /> component in #spa-nav.
 */
function initSidebar() {
	// Check it exists in the first place. Duh..
	const jqSidebar = $(SIDEBAR_ID);
	if (!jqSidebar.length) return;
	console.log("Init <Sidebar />");
	if (!get_cookie("SidebarExpand")) set_cookie("SidebarExpand", "on");
	// Init the rest of the elements
	const jqSidebarToggle = $(SIDERBAR_TOGGLE_ID);
	const jqSidebarHidden = $(SIDEBAR_HIDDEN_ID);
	const jqAppContainer = $(APP_CONTAINER_SELECTOR);
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
					if (jqSidebar.hasClass("sidebar-expanded")) $(`${SIDEBAR_ID} .overlay`).css("height", `${$(`${SIDEBAR_ID} .overlay`).height() + diff}px`);
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
	if (window.matchMedia("(min-width: 768px)").matches && get_cookie("SidebarExpand") == "on") {
		jqSidebarToggle.addClass("sidebar-expanded");
		jqSidebar.addClass("sidebar-expanded");
		jqAppContainer.addClass("sidebar-expanded");
	}
}

/**
 * Initializes all components that dynamically changes within the page
 */
function initCommon() {
	if (!window.jQuery) {
		console.error("Init common.js FAILED. No jQuery found.");
		return;
	}
	console.log("Init common.js");
	initSidebar();
}
