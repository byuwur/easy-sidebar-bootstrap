"use strict";
/*
 * File: common.js
 * Desc: Contains common resources that are initialized in a per-page basis instead of globally.
 * Deps: jQuery
 * Copyright (c) 2023 Andrés Trujillo [Mateus] byUwUr
 */

// Check if jQuery is loaded before running the script
if (window.jQuery)
	$(() => {
		console.log("Init common.js");
		// Expand the sidebar automatically on larger screens (min-width: 768px)
		if (window.matchMedia("(min-width: 768px)").matches) {
			$("#sidebar-toggle").addClass("sidebar-expanded");
			$("#sidebar").addClass("sidebar-expanded");
			$(".app-container").addClass("sidebar-expanded");
		}
		// Toggle sidebar expansion when the sidebar toggle button is clicked
		$("#sidebar-toggle")
			.off("click")
			.on("click", function () {
				if (!$("#sidebar-toggle").hasClass("sidebar-expanded")) {
					$("#sidebar-toggle").addClass("sidebar-expanded");
					$("#sidebar").addClass("sidebar-expanded");
					$(".app-container").addClass("sidebar-expanded");
					$("#sidebar-hidden").css("display", "none");
				} else {
					$("#sidebar-toggle").removeClass("sidebar-expanded");
					$("#sidebar").removeClass("sidebar-expanded");
					$(".app-container").removeClass("sidebar-expanded");
					$("#sidebar-hidden").css("display", "flex");
				}
				$("#sidebar-toggle").trigger("blur");
			});
		// Expand sidebar when the hidden sidebar area is hovered
		$("#sidebar-hidden")
			.off("mouseenter")
			.on("mouseenter", function () {
				if (!$("#sidebar-toggle").hasClass("sidebar-expanded")) {
					$("#sidebar").addClass("sidebar-expanded");
				}
			});

		// Collapse sidebar when the mouse leaves the hidden sidebar area
		$("#sidebar-hidden")
			.off("mouseleave")
			.on("mouseleave", function () {
				if (!$("#sidebar-toggle").hasClass("sidebar-expanded") && !$("#sidebar").is(":hover")) {
					$("#sidebar").removeClass("sidebar-expanded");
				}
			});
		// Ensure the sidebar collapses when the mouse leaves the sidebar itself
		$("#sidebar")
			.off("mouseleave")
			.on("mouseleave", function () {
				if (!$("#sidebar-toggle").hasClass("sidebar-expanded")) {
					$("#sidebar").removeClass("sidebar-expanded");
				}
			});
	});