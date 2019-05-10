[![npm version](https://badge.fury.io/js/%40fluidnext-polymer%2Fpaper-pagination.svg)](https://badge.fury.io/js/%40fluidnext-polymer%2Fpaper-pagination)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@fluidnext-polymer/paper-pagination)

# Paper Pagination
<p>&lt;paper-pagination&gt;&lt;/paper-pagination&gt; is a [Polymer 3](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview) web component for page navigation, simple to use and customize.</p>

See: [Demo](https://www.webcomponents.org/element/@fluidnext-polymer/paper-pagination/demo/demo/index.html).

## Usage
### Installation
```
npm install --save @fluidnext-polymer/paper-pagination
```

### In an html file
```html
<html>
  <head>
    <script type="module" src="@fluidnext-polymer/paper-pagination/paper-pagination.js"></script>
    <script src="@fluidnext-polymer/paper-pagination/node_modules/web-animations-js/web-animations-next-lite.min.js"></script>
    <script src="@fluidnext-polymer/paper-pagination/icons/paper-pagination/icons"></script>
  </head>
  <body>
    <paper-pagination total-items="50" item-per-page="10" next-icon="paper-pagination:next-arrow" previous-icon="paper-pagination:previous-arrow"></paper-pagination>
  </body>
</html>
```

### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@fluidnext-polymer/paper-pagination/paper-pagination';
import '@fluidnext-polymer/paper-pagination/icons/paper-pagination/icons';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <paper-pagination total-items="50" item-per-page="10" next-icon="paper-pagination:next-arrow" previous-icon="paper-pagination:previous-arrow"></paper-pagination>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Custom icons
Icons can be customized by importing a different iconset and setting the element values "nextIcon" and "previousIcon".

Example of iconset code imported in the [Demo]():
```js
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`
    <iron-iconset-svg name="paper-pagination" size="24">
        <svg><defs>
            <g id="next-arrow"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
            <g id="previous-arrow"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
        </defs></svg>
    </iron-iconset-svg>
`;

document.head.appendChild(template.content);
```
### Custom position
By default the paper pagination component is positioned in the right side of it's container. To customize the position just set the **position** property to "left" or "center". 

### Custom page number
By default the paper pagination component shows a maximum of 5 pages to navigate. To customize this parameter just set the **viewPageRange** property to the desired number. *Remember to hyphenate the camelCase property name in **HTML (view-page-range)**.*

### Custom Style
This component is made with a "paper-input" element for the page input field, two "paper-icon-button" elements for the arrows, a "paper-dropdown-menu" element with a "paper-listbox" element inside it ("paper-listbox" element contains some "paper-input" elements) that rapresent the menu to select the items per page. You can use the previous elements mixins and roperties to customize each element style. 
*Visit the Demo to see an example*

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/fluidnext/paper-pagination
cd paper-pagination
npm install
npm install -g polymer-cli
npm install -g wct-istanbull
```

### Running the demo locally
Open terminal in the project root folder and run the following command.
```sh
polymer serve --open
```

### Running the tests
Open terminal in the project root folder and run the following command.
```sh
polymer test
```
To see tests details, open the generated "index.html" inside "coverage/lcov-report" folder.
