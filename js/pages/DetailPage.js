import { html } from 'lit';

import View from '../view.js'
import { fetchGetMenu } from '../api/index.js';

import SpinButton from '../components/SpinButton.js';

const DEFAULT_MENU = {
  id: 1,
  name: "음식 이름",
  reviewPoint: 0.0,
  description: "불러오는 중",
  price: 0,
  imageUrl:
    "https://ldb-phinf.pstatic.net/20200416_252/1587007251652svUkx_PNG/%C4%A5%B8%AE%BA%A3%C0%CC%C4%C1_%BF%FA%BA%BC.png?type=f459_345_60_sharpen",
  pictures: [],
  reviews: [],
};

export default class DetailPage extends View {
  constructor(orderTypeIndex) {
    super();

    this.menu = DEFAULT_MENU
    this.menuAmount = 1;
    this.orderTypeIndex = orderTypeIndex;
    this.orderType = orderTypeIndex === 0 ? '포장' : '매장';

    const [menuID] = location.pathname.split('/').splice(-1);

    fetchGetMenu(menuID).then((response) => (this.menu = response));
  }

  static get properties() {
    return {
      menu: {
        type: Object,
      },
      menuAmount: {
        type: Number,
      },
      orderTypeIndex: {
        type: Number,
      },
      orderType: {
        type: String,
      },
    };
  }

  onIncreaseAmount() {
    this.menuAmount = this.menuAmount + 1;
  }

  onDecreaseAmount() {
    if (this.menuAmount <= 1) {
      return;
    }

    this.menuAmount = this.menuAmount - 1;
  }

  render() {
    return html`
    <div class="container">
      <order-header></order-header>

      <div class="menu-detail-area">
        <!-- 메뉴 이미지 영역 -->
        <div
          class="menu-img"
          style="background-image: url('${this.menu.imageUrl}');"
        ></div>
        <!-- // 메뉴 이미지 영역 -->

        <!-- 메뉴 주문 정보 영역 -->
        <div class="menu-info-area">
          <div class="common-inner">
            <p class="menu-name-group">
              <span class="menu-name">${this.menu.name}</span>
              ${
                this.menu.isPopular
                ? html`<span class="badge-popular">인기</span>` : ''
              }
            </p>

            <!-- 메뉴 정보 영역 -->
            <div class="menu-info-group">
              <span class="menu-price">${this.menu.price}원</span>
              <span class="menu-grade"><img
                  src="../assets/images/ico-star.svg"
                  alt=""
                  class="ico-star"
                />${this.menu.reviewPoint}</span>
              <span class="menu-number-of-order">주문수<em>${
                this.menu.orderCount
              }</em></span>
            </div>

            <p class="menu-desc">
              ${this.menu.description}
            </p>
            <!-- // 메뉴 정보 영역 -->

            <!-- 메뉴 주문 영역 -->
            <div class="order-type-area">
              <div class="type-select">
                <div class="title">
                  <svg viewBox="0 0 18 18" class="ico-n-logo">
                    <path fill-rule="evenodd" fill="currentColor"
                    d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
                    </path>
                  </svg>
                  주문
                </div>
                <div class="tab-switch-box" role="tablist">
                  <a
                    @click=${() => (this.orderType = '포장')}
                    class="tab-switch ${this.orderType === '포장' ? 'is-active' : ''}"
                      role="tab"
                    >🎁&nbsp;&nbsp;포장</a>
                  <a
                    @click=${() => (this.orderType = '매장')}
                    class="tab-switch ${this.orderType === '매장' ? 'is-active' : ''}"
                      role="tab"
                    >🍽&nbsp;&nbsp;매장</a>
                </div>
              </div>
              <div class="type-amount">
                <div class="title">수량</div>
                ${SpinButton({
                  count: this.menuAmount,
                  onIncrease: this.onIncreaseAmount,
                  onDecrease: this.onDecreaseAmount,
                })}
              </div>
              <button class="btn-order">
                ${this.menuAmount}개 담기
                ${this.menu.price * this.menuAmount}원
              </button>
            </div>
            <!-- // 메뉴 주문 영역 -->
          </div>
        </div>
        <!-- // 메뉴 주문 정보 영역 -->
      </div>
    </div>
    `
  }
}