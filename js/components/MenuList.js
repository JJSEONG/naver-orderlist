import { html } from 'lit';
import View from '../view.js';

export default class MenuList extends View {
  constructor(menuGroup, redirectDetailPage) {
    super();

    this.menuGroup = menuGroup;
    this.isClosed = false;
    this.redirectDetailPage = redirectDetailPage;
  }

  static get properties() {
    return {
      menuGroup: {type: Object},
      isClosed: {type: Boolean},
      redirectDetailPage: {type: Function},
    };
  }

  toggle() {
    this.isClosed = !this.isClosed
  }

  render() {
    return html `
    <div
      data-scroll-id=${this.menuGroup.category}
      class="menu-list-area ${this.isClosed ? 'is-closed' : ''}">
      <div class="common-inner">
        <div class="menu-category">
          <p class="title">${this.menuGroup.categoryName}</p>
          <button class="btn-toggle" @click=${this.toggle}>
            <img
              class="ico-arrow"
              src="./assets/images/ico-arrow.svg"
              alt=""
            />
          </button>
        </div>
  
        <ul class="menu-list">
          ${this.menuGroup.items.map(
            (item) => html`
              <li class="menu-item" @click=${ () => this.redirectDetailPage(item.id)}>
                <a href="./detail.html" class="menu-detail">
                  <div class="menu-img-area">
                    <img
                      class="menu-img"
                      src="${item.imageUrl}"
                      alt="${item.name}"
                      width="100"
                      height="110"
                    />
                  </div>
                  <div class="menu-info-area">
                    <p class="menu-name-group">
                      <span class="menu-name">${item.name}</span>
                      ${item.isPopular ? html`<span class="badge-popular">인기</span>` : ''}
                      ${item.isNew ? html`
                      <img src="../assets/images/ico-new.svg" alt="new" class="ico-new">
                      `: ''}
                    </p>
                    <div class="menu-info-group">
                      <span class="menu-grade">
                        <img class="ico-star" src="../assets/images/ico-star.svg" alt="점수" />
                        ${item.reviewPoint}
                      </span>
                      <span class="menu-number-of-order">주문수<em>${item.orderCount}</em></span>
                    </div>
                      <p class="menu-desc">${item.description}</p>
                      <p class="menu-price">${item.price}원</p>
                  </div>
                  ${item.soldOut
                    ? html`<a class="btn-cart disabled">품절</a>`
                    : html`
                      <a class="btn-cart">
                        <img class="ico-cart" src="../assets/images/ico-cart-fill-green.svg" alt="주문하기" />
                        <span class="num"> 0</span>
                      </a>`
                  }
                </a>
              </li>
            `,
          )}
        </ul>
      </div>
    </div>`
  }
}

