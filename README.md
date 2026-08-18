## This now forms part of [github.com/byuwur/spa.php](https://github.com/byuwur/spa.php). This repo will no longer be maintained to keep this in order in the base repo it is used. [This repo can also be used standalone]

# byuwur/easy-sidebar-bootstrap

**Easy Sidebar Bootstrap**

A lightweight, responsive, and customizable sidebar component built with **Bootstrap** and **jQuery**.

It provides a collapsible sidebar with responsive desktop/mobile behavior, optional accordion navigation, hover expansion, and persistent expanded/collapsed state.

Test it out at: [codepen.io/byuwur/pen/VwJdWYL](https://codepen.io/byuwur/pen/VwJdWYL)

## Features

- Responsive desktop and mobile layout
- Collapsible and expandable sidebar
- Persistent sidebar state
- Hover expansion when collapsed
- Bootstrap accordion support
- Smooth transitions
- Customizable dimensions and colors through CSS variables
- Font Awesome icon support
- Easy to integrate into an existing Bootstrap project

## Dependencies

The included example uses:

- [Bootstrap 5.3.8](https://getbootstrap.com/)
- [jQuery 4.0.0](https://jquery.com/)
- [Font Awesome 7.3.0](https://fontawesome.com/) (Optional: only required for the icons used by the example markup and can be replaced or omitted)

## Files

### `index.html`

Standalone example containing the sidebar markup and basic page layout.

### `_common.css`

Contains the styles and responsive behavior required by the sidebar.

The main dimensions can be customized through the variables at the top of the file:

```css
:root {
  --sidebar-width: 5rem;
  --sidebar-height: 4.5rem;
  --sidebar-expanded-width: 20rem;
}
```

### `_common.js`

Handles sidebar initialization and interactive behavior, including:

- Expanding and collapsing
- Hover behavior
- Responsive initialization
- Persistent sidebar state

### `_functions.js`

Contains the cookie helpers used by `_common.js` to preserve the sidebar state between page loads.

## Getting Started

Include Bootstrap, jQuery, the sidebar stylesheet, and the JavaScript files:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="_common.css" />
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" defer></script>
<script src="https://code.jquery.com/jquery-4.0.0.min.js" defer></script>
<script src="_functions.js" defer></script>
<script src="_common.js" defer></script>
```

Then copy or adapt the sidebar markup from `index.html`.

The component expects the following main elements:

```html
<nav id="bywr-sidebar" class="bywr-sidebar"> ... </nav>
<button id="bywr-sidebar-toggle" class="bywr-sidebar-toggle" type="button"> ... </button>
<div id="bywr-sidebar-hidden" class="bywr-sidebar-hidden"> ... </div>
<main class="app-container"> ... </main>
```

Finally, initialize the component:

```html
<script>
  byCommon.init();
</script>
```

## Customization

Modify the sidebar markup in `index.html` to add your own navigation links, accordion sections, branding, and icons.

The component's size and appearance can be adjusted in `_common.css`, particularly through the CSS variables defined in `:root`.

The example styles are intended as a starting point and can be adapted to match the design of the host application.

## Browser Behavior

On larger screens, the sidebar can remain expanded according to the user's saved preference.

When collapsed, hovering over the sidebar area temporarily expands it without changing the saved preference.

On smaller screens, the layout adapts so the sidebar can occupy the available viewport when expanded.

## License

MIT (c) Andrés Trujillo [Mateus] byUwUr
