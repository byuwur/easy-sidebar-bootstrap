"use strict";
/*
 * File: _common.js
 * Desc: Contains common resources that are initialized in a per-page basis instead of globally.
 * Deps: jQuery, /_functions.js
 * Copyright (c) 2023 Andrés Trujillo [Mateus] byUwUr
 */

/**
 * Initializes the <Sidebar /> component in #spa-nav.
 */
function initSidebar() {
	// Check it exists in the first place. Duh..
	if (!$("#sidebar").length) return;
	console.log("Init <Sidebar />");
	if (!getCookie("SidebarExpand")) setCookie("SidebarExpand", "on");
	// Ensure the overlay inside the sidebar follows it accordingly, due to being an absolute positioned inside another
	$("#sidebar")
		.off("scroll")
		.on(
			"scroll",
			(function () {
				let sidebarScrollTop = 0;
				return debounce(function () {
					const top = Math.floor($(this).scrollTop()),
						diff = top - sidebarScrollTop;
					console.log(top);
					if ($("#sidebar").hasClass("sidebar-expanded")) $("#sidebar .overlay").css("height", `${$("#sidebar .overlay").height() + diff}px`);
					sidebarScrollTop = top;
				});
			})()
		)
		// Ensure the sidebar collapses when the mouse leaves the sidebar itself
		.off("mouseleave")
		.on("mouseleave", function () {
			if (!$("#sidebar-toggle").hasClass("sidebar-expanded")) $("#sidebar").removeClass("sidebar-expanded");
		});
	// Toggle sidebar expansion when the sidebar toggle button is clicked
	$("#sidebar-toggle")
		.off("click")
		.on("click", function () {
			$("#sidebar-toggle").trigger("blur");
			$("#sidebar .overlay").css("height", "");
			if (!$("#sidebar-toggle").hasClass("sidebar-expanded")) {
				$("#sidebar-toggle").addClass("sidebar-expanded");
				$("#sidebar").addClass("sidebar-expanded");
				$(".app-container").addClass("sidebar-expanded");
				$("#sidebar-hidden").css("display", "none");
				setCookie("SidebarExpand", "on");
			} else {
				$("#sidebar-toggle").removeClass("sidebar-expanded");
				$("#sidebar").removeClass("sidebar-expanded");
				$(".app-container").removeClass("sidebar-expanded");
				$("#sidebar-hidden").css("display", "flex");
				$("#sidebar").scrollTop(0);
				setCookie("SidebarExpand", "off");
			}
		});
	// Expand sidebar when the hidden sidebar area is hovered
	$("#sidebar-hidden")
		.off("mouseenter")
		.on("mouseenter", function () {
			if (!$("#sidebar-toggle").hasClass("sidebar-expanded")) $("#sidebar").addClass("sidebar-expanded");
		});
	// Collapse sidebar when the mouse leaves the hidden sidebar area
	$("#sidebar-hidden")
		.off("mouseleave")
		.on("mouseleave", function () {
			if (!$("#sidebar-toggle").hasClass("sidebar-expanded") && !$("#sidebar").is(":hover")) $("#sidebar").removeClass("sidebar-expanded");
		});
	// Expand the sidebar automatically on larger screens (min-width: 768px)
	if (window.matchMedia("(min-width: 768px)").matches && getCookie("SidebarExpand") == "on") {
		$("#sidebar-toggle").addClass("sidebar-expanded");
		$("#sidebar").addClass("sidebar-expanded");
		$(".app-container").addClass("sidebar-expanded");
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
