import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/neon-animation/neon-animation';
import './icons/paper-pagination-icons.js';

export class PaperPagination extends PolymerElement {

    static get template() {
        return html`
            <style >
                :host {
                    display: block;
                }
    
                .flex {
                    @apply --layout;
                }
    
                .flex-horizontal {
                    @apply --layout-horizontal;
                }
    
                .flex-vertical {
                    @apply --layout-vertical;
                }

                .flex-start-justified{
                    @apply --layout-start-justified;
                }

                .flex-center-justified{
                    @apply --layout-center-justified;
                }
    
                .flex-end-justified {
                    @apply --layout-end-justified;
                }
                
                paper-input{
                    display: flex;
                    position: relative;
                    width: 40px;
                }

                paper-dropdown-menu {
                    width: 50px;
                }
                
                paper-listbox {
                    min-width: 60px;
                }
    
                paper-button {
                    height: 30px;
                    width: 30px !important;
                    min-width: 30px !important;
                    border-radius: 50%;
                    margin: 0.29em;
                    font-weight: 600;
                }
    
                paper-input {
                    top: -20px;
                }

                paper-dropdown-menu {
                    top: -20px;
                }
    
                .selected {
                    background-color: var(--dark-primary-color);
                    color: var(--text-primary-color);
                }
    
            </style>
            <div hidden$="[[hide]]">
                <div id="container"></div>
            </div>
               
        `
    }

    /**
     * Properties
     */
    static get properties() {
        return {

            position: {
                type: String,
                value: 'right',
                observer: '_changePosition'
            },
            
            viewPageRange: {
                type: Number,
                value: 5
            },

            page: {
                type: Number,
                value: 1,
                notify: true
            },

            totalItems: {
                type: Number
            },

            itemPerPage: {
                type:Number,
                notify: true,
                observer: '_changeItemPerPage'
            },

            numberPages: {
                type: Number,
                readOnly: true,
            },

            listNumberPerPage: {
                type: Array,
                value: [
                    5,
                    10,
                    20,
                    30,
                    40,
                    50
                ]
            },

            nextIcon: {
                type: String,
            },

            previousIcon: {
                type: String,
            }
        }
    }

    static get observers() {
        return [
            '_render(page, totalItems, itemPerPage)'
        ]
    }

    /**
     * @return {boolean}
     */
    _hide() {
        return this.totalItems <= this.itemPerPage;
    }  

    /**
     * @param newValue
     * @private
     */
    _changeItemPerPage(newValue, oldValue) {
        // if (!newValue) {
        //     return;
        // }

        let find = this.listNumberPerPage.find(
            (itemPerPage) => {
                return itemPerPage === newValue
        });

        if (!find) {
            this.listNumberPerPage.push(newValue);
            this.listNumberPerPage.sort((prev , next) => {
                return prev - next;
            });
            this._render(this.page, this.totalItem, this.itemPerPage);
        }
        
        if(oldValue){
            let firstPageElement = (oldValue*(this.page-1))+1;
            this.page = Math.floor(((firstPageElement-1)/newValue)+1);
        }
    }

    /**
     * @param {Number} page
     * @param {Number} totalItem
     * @param {Number} itemPerPage
     * @private
     */
    _render(page, totalItem, itemPerPage) {
        this.hide = this._hide();
        if (typeof page !== 'number' || typeof totalItem !== 'number' || typeof itemPerPage !== 'number' || this.hide) {
            return;
        }

        this._setNumberPages(Math.ceil(totalItem / itemPerPage));

        this._clear();
        // if (this.numberPages < 2) {
        //     if (totalItem > 0) {
        //         this.$.container.appendChild(this._createNumberItemsElement());
        //     }
        //     return;
        // }

        this.$.container.appendChild(this._createInputElement(page));

        if (this.nextIcon) {
            this.$.container.appendChild(this._createPreviousElement());
        }

        let middlePageButtonIndex = Math.floor(this.viewPageRange/2);
        if(page > middlePageButtonIndex){
            let firstPageButton;
            let lastPageButtonCounter = this.viewPageRange - middlePageButtonIndex;
            if(this.numberPages > this.viewPageRange +1){
                if(page + this.viewPageRange <= this.numberPages + lastPageButtonCounter){
                    firstPageButton = page - middlePageButtonIndex;
                } else {
                    firstPageButton = this.numberPages - this.viewPageRange +1;
                }                
            } else {
                firstPageButton = 1;
            }
            for (let count = firstPageButton; count < firstPageButton + this.viewPageRange && count <= this.numberPages;  count++) {
                this.createPageButton(page, count);
            }
        } else {
            for (let count = 1; count <= this.viewPageRange && count <= this.numberPages;  count++) {
                this.createPageButton(page, count);
            }
        }

        if (this.nextIcon) {
            this.$.container.appendChild(this._createNextElement());
        }
        this.$.container.appendChild(this._createNumberItemsElement());
    }

    /**
     * @private
     */
    _createInputElement(page){
        let element = document.createElement('paper-input');
        element.type = "number";
        element.value = page;
        element.addEventListener("keyup", this.sendInput.bind(this));
        return element;
    }

    /**
     * @private
     */
    _createPreviousElement() {
        let element = document.createElement('paper-icon-button');
        element.icon = this.previousIcon;
        if (this.page > 1) {
            element.addEventListener('click', this.clickPreviousPage.bind(this));
        } else {
            element.disabled = true;
        }
        return element;
    }

    /**
     * @private
     */
    _createNextElement() {
        let element = document.createElement('paper-icon-button');
        element.icon = this.nextIcon;
        if (this.numberPages <= this.page) {
            element.disabled = true;
        } else {
            element.addEventListener('click', this.clickNextPage.bind(this));
        }
        return element;
    }

    /**
     * @private
     */
    _createNumberItemsElement() {
        let element = document.createElement('paper-dropdown-menu');
        element.addEventListener('iron-select', this.clickItemPerPage.bind(this));
        let paperBox = document.createElement('paper-listbox');
        paperBox.slot = "dropdown-content";
        for (let cont = 0; this.listNumberPerPage.length > cont; cont++) {
            if (this.itemPerPage === this.listNumberPerPage[cont]) {
                paperBox.selected = cont;
            }
            let paperItem = document.createElement('paper-item');
            paperItem.textContent = this.listNumberPerPage[cont];
            paperBox.appendChild(paperItem);
        }
        element.appendChild(paperBox);
        return element;
    }

    /**
     * @private
     */
    _clear() {
        while (this.$.container.hasChildNodes()) {
            this.$.container.removeChild(this.$.container.lastChild);
        }
    }

    _changePosition(newPosition, oldPosition){
        switch(newPosition){
            case "center":
                this.$.container.className = "flex flex-center-justified";
                break;
            case "left":
                this.$.container.className = "flex flex-start-justified";
                break;
            default:
                this.$.container.className = "flex flex-end-justified";
                break;
        }
    }

    /**
     * @param evt
     */
    clickPage(evt) {
        this.page = evt.target.page;
    }

    /**
     *
     */
    clickPreviousPage() {
        if (this.page < 2) {
            return;
        }
        this.page--;
    }

    /**
     *
     */
    clickNextPage() {
        if (this.numberPages <= this.page) {
            return;
        }
        this.page++;
    }

    /**
     *
     */
    sendInput(event){
        if (event.keyCode === 13) {
            let element = this.$.container.querySelector("paper-input");
            element.value = parseInt(element.value);
            if(element.value <= this.numberPages && element.value >= 1){
                this.page = element.value;
            } else {
                element.value = undefined;
                element.placeholder = this.page;
            }
        }
    }

    /**
     * @param evt
     */
    clickItemPerPage(evt) {
        this.itemPerPage = parseInt(evt.detail.item.textContent);
    }

     /**
     * 
     */
    createPageButton(page, count){
        let element;
        element = document.createElement('paper-button');
        element.textContent = count;
        element.page = count;
        if (count === page) {
            element.disabled = true;
            element.classList.add("selected");
        }
        element.addEventListener('click', this.clickPage.bind(this));
        this.$.container.appendChild(element);
    }
}

window.customElements.define('paper-pagination', PaperPagination);