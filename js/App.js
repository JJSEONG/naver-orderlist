import { html, LitElement } from 'lit';

export default class App extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      message: {
        type: String
      }
    }
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <div className="container">
      <header class="header-area">
        <div class="place-header">
          <h1 class="title">
            <a href="#" class="link-back">
              <img src="../assets/images/ico-back.svg" alt="뒤로가기">
            </a>
            샐러드 구미도량점
          </h1>
          <a href="#" class="my-orders">주문내역</a>
        </div>
        <div class="place-tab scroll-x" role="tablist">
          <div class="tab-inner">
            <a href="#" class="tab" role="tab"><span class="txt">홈</span></a>
            <a href="#" class="tab is-active" role="tab"><span class="txt">메뉴</span></a>
            <a href="#" class="tab" role="tab"><span class="txt">리뷰</span></a>
            <a href="#" class="tab" role="tab"><span class="txt">사진</span></a>
            <a href="#" class="tab" role="tab"><span class="txt">지도</span></a>
            <a href="#" class="tab" role="tab"><span class="txt">주변</span></a>
          </div>
        </div>
      </header>
    </div>`;
  }

  changeMessage(event) {
    this.message = "Hello World Click!!"
  }
}