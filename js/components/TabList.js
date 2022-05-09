import { html } from 'lit';
import View from '../view.js';

const TABS = [
  {
    text: html`🎁&nbsp;&nbsp;포장`,
    imageUrl: '../assets/images/ico-check.svg'
  },
  {
    text: html`🍽&nbsp;&nbsp;매장`,
    imageUrl: '../assets/images/ico-check.svg'
  },
  {
    text: html`🛵&nbsp;&nbsp;배달`,
    imageUrl: '../assets/images/ico-check.svg'
  },
];

export default class MenuList extends View {
  constructor(tabIndex = 0, onChangeTab) {
    super();

    this.tabIndex = tabIndex
    this.onChangeTab = onChangeTab;
  }

  static get properties() {
    return {
      tabIndex: {type: Number},
      onChangeTab: {type: Function},
    };
  }
  render() {
    return html`
    <div class="tab-switch-box" role="tablist">
      ${TABS.map(
        (tab, index) =>html`
        <a href="#"
            class="tab-switch ${index === this.tabIndex ? 'is-active' : ''}"
            role="tab"
            @click=${() => this.onChangeTab(index)}
          >
            ${tab.text}
            <img
            src="${tab.imageUrl}"
            alt="${tab.text}"
            class="ico-check"
            aria-hidden="${index === this.tabIndex}"
          />
        </a>`,
      )}
    </div>
    `
  }
}