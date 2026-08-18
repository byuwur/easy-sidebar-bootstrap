"use strict";
/*
 * File: _common.js
 * Desc: Contains common resources and functions that are initialized in a per-page basis instead of globally and can be used project-wide.
 * Deps: jQuery, /_functions.js
 * Copyright (c) 2026 Andrés Trujillo [Mateus] byUwUr
 */

/**
 * Initializes global object and assigns its properties.
 * This IIFE (Immediately Invoked Function Expression) ensures byCommon object exists globally
 * (typically on `window` in a browser) to avoid pollution and conflicts in the global namespace.
 * @param {Object} global - The global object, usually `window` in a browser.
 */
(function (global) {
  global.byCommon = global.byCommon || {};
  const byCommon = global.byCommon;
  // Common selectors
  byCommon.SIDEBAR_ID = "#bywr-sidebar";
  byCommon.SIDEBAR_TOGGLE_ID = "#bywr-sidebar-toggle";
  byCommon.SIDEBAR_HIDDEN_ID = "#bywr-sidebar-hidden";
  byCommon.APP_CONTAINER_SELECTOR = ".app-container";
  byCommon.COOKIE_CONSENT_READY = byCommon.COOKIE_CONSENT_READY || false;
  byCommon.SECTION_TOP_OVERHEAD = 0;

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
    const jqSidebarToggle = $(byCommon.SIDEBAR_TOGGLE_ID);
    if (!jqSidebarToggle.length) console.warn(`Can't load Sidebar Element: "jqSidebarToggle". It doesn't exist.`);
    const jqSidebarHidden = $(byCommon.SIDEBAR_HIDDEN_ID);
    if (!jqSidebarHidden.length) console.warn(`Can't load Sidebar Element: "jqSidebarHidden". It doesn't exist.`);
    const jqAppContainer = $(byCommon.APP_CONTAINER_SELECTOR);
    if (!jqAppContainer.length) console.warn(`Can't load Sidebar Element: "jqAppContainer". It doesn't exist.`);
    // Ensure the overlay inside the sidebar follows it accordingly, due to being an absolute positioned inside another
    jqSidebar
      .off("scroll.byCommon")
      .on("scroll.byCommon", function () {
        const overlay = $(this).find(".bywr-sidebar-overlay");
        if ($(overlay).length) $(overlay).height(`${this.scrollHeight}px`);
      })
      // Ensure the sidebar collapses when the mouse leaves the sidebar itself
      .off("mouseleave.byCommon")
      .on("mouseleave.byCommon", function () {
        if (!jqSidebarToggle.hasClass("bywr-sidebar-expanded")) jqSidebar.removeClass("bywr-sidebar-expanded");
      });
    // Toggle sidebar expansion when the sidebar toggle button is clicked
    jqSidebarToggle.off("click.byCommon").on("click.byCommon", function () {
      jqSidebarToggle.trigger("blur");
      $("#bywr-sidebar .bywr-sidebar-overlay").css("height", "");
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
    jqSidebarHidden.off("mouseenter.byCommon").on("mouseenter.byCommon", function () {
      $("#bywr-sidebar .bywr-sidebar-overlay").css("height", "");
      if (!jqSidebarToggle.hasClass("bywr-sidebar-expanded")) jqSidebar.addClass("bywr-sidebar-expanded");
    });
    // Collapse sidebar when the mouse leaves the hidden sidebar area
    jqSidebarHidden.off("mouseleave.byCommon").on("mouseleave.byCommon", function () {
      $("#bywr-sidebar .bywr-sidebar-overlay").css("height", "");
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
   * Some other initializations for common resources in the page.
   */
  byCommon.initMisc = function () {
    // Smooth scroll for links with hashes in their href (excluding empty hashes)
    $("a[href*='#']:not([href='#'])")
      .off("click.byCommon")
      .on("click.byCommon", function (event) {
        if (this.hash && this.hash.startsWith("#/")) return;
        event.preventDefault();
        // Scroll to the target element if it exists on the same page
        if ($(this.hash).length)
          $(`html, body, ${byCommon.APP_CONTAINER_SELECTOR}`)
            .stop()
            .animate(
              {
                scrollTop: $(this.hash).offset().top - byCommon.SECTION_TOP_OVERHEAD
              },
              99,
              "swing"
            );
        // Collapse the navbar after clicking the link
        setTimeout(() => {
          $(".navbar-collapse").collapse("hide");
          if (window.innerWidth < 768 && $(byCommon.SIDEBAR_TOGGLE_ID).hasClass("bywr-sidebar-expanded")) {
            $(byCommon.SIDEBAR_TOGGLE_ID).removeClass("bywr-sidebar-expanded");
            $(byCommon.SIDEBAR_ID).removeClass("bywr-sidebar-expanded");
            $(byCommon.APP_CONTAINER_SELECTOR).removeClass("bywr-sidebar-expanded");
            $(byCommon.SIDEBAR_ID).scrollTop(0);
          }
        }, 333);
      });
    console.log("Init misc");
  };

  /**
   * Initializes all Bootstrap components within the #spa-content.
   * It should be called whenever the content of the #spa-page-content-container changes dynamically to ensure that all components function correctly.
   */
  byCommon.initBootstrap = function () {
    if (typeof bootstrap === "undefined" && !window.bootstrap) return console.warn("Can't load Bootstrap if script ain't present.");
    try {
      const route = String(window.bySPA?.URL || window.location.pathname);

      // Body-mounted modals outlive SPA content, so remove only those from the previous route.
      $("body > .modal[data-byspa-modal]")
        .filter(function () {
          return $(this).attr("data-byspa-route") !== route;
        })
        .each(function () {
          if ($.fn.select2) $(this).find("select.select2-hidden-accessible").select2("destroy");
          bootstrap.Modal.getInstance(this)?.dispose();
          $(this).remove();
        });

      if (!$("body > .modal.show").length) {
        $(".modal-backdrop").remove();
        $("body").removeClass("modal-open").css({ overflow: "", paddingRight: "" });
      }

      // Keep form modals above the SPA stacking context and Select2 inside its modal.
      $("#spa-content .modal").each(function () {
        const $modal = $(this)
          .attr({
            "data-byspa-modal": "true",
            "data-byspa-route": route
          })
          .appendTo("body");
        if (!$.fn.select2) return;
        $modal.find("select").each(function () {
          $(this).select2({ dropdownParent: $modal, width: "100%" });
        });
      });

      // Initialize Alert components
      [...document.querySelectorAll(".alert")].forEach((alertEl) => bootstrap.Alert.getInstance(alertEl) ?? new bootstrap.Alert(alertEl));
      // Initialize Carousel components
      [...document.querySelectorAll(".carousel")].forEach((carouselEl) => bootstrap.Carousel.getInstance(carouselEl) ?? new bootstrap.Carousel(carouselEl));
      // Initialize Collapse components
      [...document.querySelectorAll(".collapse")].forEach((collapseEl) => bootstrap.Collapse.getInstance(collapseEl) ?? new bootstrap.Collapse(collapseEl, { toggle: false }));
      // Initialize Dropdown components
      [...document.querySelectorAll(".dropdown-toggle")].forEach((dropdownEl) => bootstrap.Dropdown.getInstance(dropdownEl) ?? new bootstrap.Dropdown(dropdownEl));
      // Initialize Modal components
      [...document.querySelectorAll(".modal")].forEach((modalEl) => bootstrap.Modal.getInstance(modalEl) ?? new bootstrap.Modal(modalEl));
      // Initialize Offcanvas components
      [...document.querySelectorAll(".offcanvas")].forEach((offcanvasEl) => bootstrap.Offcanvas.getInstance(offcanvasEl) ?? new bootstrap.Offcanvas(offcanvasEl));
      // Initialize Tooltip components
      [...document.querySelectorAll("[data-bs-toggle='tooltip']")].forEach((tooltipEl) => {
        const tooltip = bootstrap.Tooltip.getInstance(tooltipEl) ?? new bootstrap.Tooltip(tooltipEl, { animation: false });
        $(tooltipEl)
          .off("pointerdown pointerleave pointerdown.tooltipDismiss pointerleave.tooltipDismiss")
          .on("pointerdown pointerleave pointerdown.tooltipDismiss pointerleave.tooltipDismiss", function () {
            tooltip.hide();
          });
        return tooltip;
      });
      // Initialize Popover components
      [...document.querySelectorAll("[data-bs-toggle='popover']")].forEach((popoverEl) => bootstrap.Popover.getInstance(popoverEl) ?? new bootstrap.Popover(popoverEl, { animation: false }));
      // Initialize ScrollSpy components
      [...document.querySelectorAll(".scrollspy")].forEach((scrollspyEl) => bootstrap.ScrollSpy.getInstance(scrollspyEl) ?? new bootstrap.ScrollSpy(scrollspyEl));
      // Initialize Tab components
      [...document.querySelectorAll(".nav-tabs .nav-link")].forEach((tabEl) => bootstrap.Tab.getInstance(tabEl) ?? new bootstrap.Tab(tabEl));
      // Initialize Toast components
      [...document.querySelectorAll(".toast")].forEach((toastEl) => bootstrap.Toast.getInstance(toastEl) ?? new bootstrap.Toast(toastEl));
      // Keep aria-pressed synchronized without creating a Button instance on tooltip elements
      [...document.querySelectorAll(".btn")].forEach((buttonEl) => {
        $(buttonEl)
          .off("click.byCommonBootstrap")
          .on("click.byCommonBootstrap", function () {
            buttonEl.setAttribute("aria-pressed", buttonEl.classList.contains("active"));
          });
      });
      // Add more as needed, in case BS drops another class
      console.log("Init bootstrap");
    } catch (e) {
      console.warn("initBootstrap():", e);
    }
  };

  /**
   * Initializes all components that dynamically changes within the page
   */
  byCommon.init = function () {
    if (typeof jQuery === "undefined" && !window.jQuery) return console.error("Init _common.js FAILED. No jQuery found.");
    $(() => {
      console.log("Init _common.js");
      byCommon.initMisc();
      byCommon.initBootstrap();
      byCommon.initSidebar();
    });
  };
})(typeof window !== "undefined" ? window : this);
