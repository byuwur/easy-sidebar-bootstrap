# byuwur/easy-sidebar-bootstrap

**Easy Sidebar Bootstrap**

A lightweight and customizable sidebar component built using Bootstrap and jQuery. This project allows you to quickly integrate a responsive sidebar into your web applications. The sidebar is fully collapsible and expandable, with smooth animations and an accordion-style menu structure.

## Features

-   **Responsive Design**: The sidebar adapts to various screen sizes, providing a seamless experience on both desktop and mobile devices.
-   **Collapsible Sidebar**: The sidebar can be expanded or collapsed with a single click, offering more space for your content.
-   **Accordion Menu**: Includes an accordion-style menu for nested options, ideal for organizing related items.
-   **Customization**: Easily customizable with your styles, icons, and colors.

## Files

### 1. `index.html`

This is the main HTML file that includes the sidebar component integrated into a basic layout. It uses Bootstrap, jQuery, and Font Awesome for styling and functionality.

-   **External Resources**:
    -   **Bootstrap** CSS and JS via CDN
    -   **FontAwesome** for icons
    -   **jQuery** for DOM manipulation

### 2. `_common.css`

This CSS file contains the styling for the sidebar, including the general body styles, background settings, and effects. It ensures that the sidebar and its elements are displayed correctly across different devices and screen sizes.

-   **Root Variables**: Defines `--sidebar-width` and `--sidebar-expanded-width` for easy customization.
-   **Sidebar Styles**: Styles for the sidebar, accordion items, and toggle button.
-   **Responsive Design**: Media queries to adjust the layout on smaller screens.

### 3. `_common.js`

The JavaScript file that handles the interactive functionality of the sidebar. It includes event listeners for the sidebar toggle button, as well as logic for expanding and collapsing the sidebar based on user interaction.

-   **Dependencies**:
    -   **jQuery** is required for this script to work.
-   **Event Listeners**:
    -   Click event for the sidebar toggle button.
    -   Hover events for expanding/collapsing the sidebar.

## Getting Started

To integrate this sidebar into your project:

1. **Include the necessary files**:

    - Copy the contents of `index.html`, `_common.css`, and `_common.js` into your project.

2. **Customize the sidebar**:

    - Update the sidebar options and links in the HTML file.
    - Modify the CSS variables to adjust the sidebar width and colors.
    - Add or remove items from the accordion menu as needed.

3. **Lauch your project**:
    - Ensure all dependencies (Bootstrap, jQuery, Font Awesome) are correctly linked.
    - Test the sidebar on different devices to verify responsiveness.

## License

This project is licensed under MIT. The terms specified in the [LICENSE.md](LICENSE.md) file.
