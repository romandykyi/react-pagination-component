# React Pagination Component

A simple component responsible for rendering a pagination user interface with page buttons for navigation.

[GitHub Pages Demo](https://romandykyi.github.io/react-pagination-component/).

### Key Features

* Previous and Next buttons.
* Page buttons that allow users to jump to specific pages.
* Dynamically added "..." buttons where there are too many pages to display.
* Dynamic application of CSS classes to style the pagination buttons based on their state (e.g., selected, disabled, or navigation).

### Usage

This component is designed to be used in a web application where you need to implement pagination for a list of items or data.
It can be configured with various props, such as `pageSize`, `boundaryCount`, `middleCount`, and `totalElementsCount`, to customize its behavior.

### Notable Points

The component uses the React Context API to manage and update the current page number, which allows for coordination with other components in the application.
