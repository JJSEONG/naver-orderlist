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
    this.isPopupOpen = false;

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
      isPopupOpen: {
        type: Boolean,
      },
    };
  }

  openOrderPopup() {
    this.isPopupOpen = true;
  }

  closeOrderPopup() {
    this.isPopupOpen = false;
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
              <button class="btn-order @click=${this.openOrderPopup}">
                ${this.menuAmount}개 담기
                ${this.menu.price * this.menuAmount}원
              </button>
            </div>
            <!-- // 메뉴 주문 영역 -->
          </div>
        </div>
        <!-- // 메뉴 주문 정보 영역 -->
      </div>

      <!-- 옵션 팝업영역 -->
      <div class="option-popup-area ${this.isPopupOpen ? 'show' : ''}">
        <div class="dimmed-layer light"></div>
        <div class="menu-option-popup">
          <svg class="content-top-pattern" width="100%" height="100%">
            <defs>
                <pattern id="pattern-triangle" x="0" y="0" width="10" height="11" patternUnits="userSpaceOnUse">
                    <polygon points="5 5, 10 10, 10 11, 0 11, 0 10"></polygon>
                </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-triangle)"></rect>
          </svg>

          <div class="content-top">
            <div class="common-inner">
              <div class="menu-img-area">
                <img src="${this.menu.imageUrl}" alt="${this.menu.name}" class="menu-img">
              </div>
              <div class="menu-detail-area">
                <p class="menu-name">
                  <span class="name">${this.menu.name}</span>
                  <span class="badge">${this.menu.orderType}</span>
                </p>
                ${SpinButton({
                  count: this.menuAmount,
                  onIncrease: this.onIncreaseAmount,
                  onDecrease: this.onDecreaseAmount,
                })}
              </div>
              <button class="btn-close" @click=${this.closeOrderPopup}>
                <img
                  src="/assets/images/ico-close.svg"
                  alt="order popup close button"
                  class="ico-close"
                />
              </button>
            </div>
          </div>

          <div class="content-body">
            <div class="option-group">
              <div class="option-title">
                <p class="title">
                  <span class="badge required">필수</span>
                  <span class="text">베이스 선택</span>
                </p>
              </div>
              <ul class="option-list">
                <li class="option-item">
                  <input type="radio" id="rd1" class="input-radio" name="base" checked>
                  <label for="rd1" class="label">
                    <span class="label-txt">추천대로</span>
                    <span class="label-icon"></span>
                  </label>
                </li>
                <li class="option-item">
                  <input type="radio" id="rd2" class="input-radio" name="base">
                  <label for="rd2" class="label">
                    <span class="label-txt">채소볼</span>
                    <span class="label-icon"></span>
                  </label>
                </li>
                <li class="option-item">
                  <input type="radio" id="rd3" class="input-radio" name="base">
                  <label for="rd3" class="label">
                    <span class="label-txt">곡물볼</span>
                    <span class="label-icon"></span>
                  </label>
                </li>
              </ul>
            </div>

            <div class="option-group">
              <div class="option-title">
                <p class="title">
                  <span class="badge required">선택</span>
                  <span class="text">토핑추가</span>
                </p>
                <p class="desc">최대 5개까지 선택할 수 있습니다.</p>
              </div>
              <ul class="option-list">
                <li class="option-item">
                  <input type="checkbox" id="chk1" class="input-check" checked>
                  <label for="chk1" class="label">
                    <span class="label-txt">채소추가(기본 제공량의 30% 추가) <span class="price">+900원</span></span>
                    <span class="label-icon"></span>
                  </label>
                </li>
                <li class="option-item">
                  <input type="checkbox" id="chk2" class="input-check">
                  <label for="chk2" class="label">
                    <span class="label-txt">곡물추가(기본 제공량의 50% 추가) <span class="price">+900원</span></span>
                    <span class="label-icon"></span>
                  </label>
                </li>
                <li class="option-item">
                  <input type="checkbox" id="chk3" class="input-check">
                  <label for="chk3" class="label">
                    <span class="label-txt">시저 드레싱 추가 <span class="price">+900원</span></span>
                    <span class="label-icon"></span>
                  </label>
                </li>
              </ul>
            </div>

            <div class="option-group">
              <div class="option-title">
                <p class="title">
                  <span class="badge">선택</span>
                  <span class="text">토핑추가</span>
                </p>
                <P class="desc">최대 5개까지 선택할 수 있습니다.</P>
              </div>
              <ul class="option-list">
                <li class="option-item">
                  <label class="label checked">
                    <span class="label-txt">치킨
                      <span class="price">+1,500원</span>
                    </span>
                  </label>
                  <div class="amount-select">
                    <button class="btn-minus enabled" aria-label="빼기" disabled></button>
                    <span class="amount">2</span>
                    <button class="btn-plus enabled" aria-label="더하기"></button>
                  </div>
                </li>

                <li class="option-item">
                  <label class="label">
                    <span class="label-txt">에그
                      <span class="price">+900원</span>
                    </span>
                  </label>
                  <div class="amount-select">
                    <button class="btn-minus" aria-label="빼기" disabled></button>
                    <span class="amount">1</span>
                    <button class="btn-plus enabled" aria-label="더하기"></button>
                  </div>
                </li>

                <li class="option-item">
                  <label class="label">
                    <span class="label-txt">치킨소세지
                      <span class="price">+1,900원</span>
                    </span>
                  </label>
                  <div class="amount-select">
                    <button class="btn-minus" aria-label="빼기" disabled></button>
                    <span class="amount">1</span>
                    <button class="btn-plus enabled" aria-label="더하기"></button>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="content-bottom">
            <button class="btn-order">1개 담기 9,999원</button>
          </div>
        </div>
      </div>
    <!-- // 옵션 팝업영역 -->
    </div>
    `
  }
}