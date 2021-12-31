class BlogModal extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'content'];
  }

  constructor() {
    super(); 
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = newValue;
    }
  }

  get title() {
    return this.getAttribute('title');
  }

  get content() {
    return this.getAttribute('content');
  }

  set title(value) {
    if(value){
      this.setAttribute('title', value)
    } else {
      this.removeAttribute('title')
    }
  }

  set content(value) {
    if(value){
      this.setAttribute('content', value)
    } else {
      this.removeAttribute('content')
    }
  }

  render() {
    const { shadowRoot } = this;
    const templateNode = document.getElementById('modal-template');

    shadowRoot.innerHTML = '';

    if (templateNode) {
      const instance =  document.importNode(templateNode.content, true);
      instance.querySelector('.title').innerHTML = this['title'];
      instance.querySelector('.subtitle').innerHTML = this['content'];

      shadowRoot.appendChild(instance);
    } else {
      shadowRoot.innerHTML = '<p>Shadow Root failed. Please try again later.</p>';
    }
  }

 

}

customElements.define('blog-modal', BlogModal);