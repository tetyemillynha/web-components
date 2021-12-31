class MyCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = 'Hello Word'
  }
}

window.customElements.define('my-card', MyCard);