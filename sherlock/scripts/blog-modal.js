class BlogModal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'title', 'subtitle', 'cover', 'synopsis'];
  }

  constructor() {
    super(); 
    this.attachShadow({mode: 'open'});
    this.close = new CustomEvent('close', {
      bubbles: true,
      cancelable: false,
      detail: {
        open: false
      }
    });
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName !== 'open' && oldValue !== newValue && newValue !== null) {
      this[attrName] = newValue;
    } else if(attrName === 'open') {
      this[attrName] = this.hasAttribute(attrName);
    }

    this.render()
  }

  // get title() {
  //   return this.getAttribute('title');
  // }

  // get content() {
  //   return this.getAttribute('content');
  // }

  // set title(value) {
  //   if(value){
  //     this.setAttribute('title', value)
  //   } else {
  //     this.removeAttribute('title')
  //   }
  // }

  // set content(value) {
  //   if(value){
  //     this.setAttribute('content', value)
  //   } else {
  //     this.removeAttribute('content')
  //   }
  // }

  render() {
    const { shadowRoot } = this;
    const templateNode = document.getElementById('modal-template');
    const loading = [
      {transform: 'rotate(0deg)'},
      {transform: 'rotate(360deg)'},
    ]
    const loadigTiming = {
      duration: 3000,
      iteration: 50
    }

    shadowRoot.innerHTML = '';

    if (templateNode) {
      const instance =  document.importNode(templateNode.content, true);
      const close = instance.querySelector('.close');
      const wrapper = instance.querySelector('.wrapper');
      const title = instance.querySelector('.title');
      const subtitle = instance.querySelector('.subtitle');
      const synopsis = instance.querySelector('.synopsis');
      const cover = instance.querySelector('.cover');
      const loader = instance.querySelector('.loader');
      const loadAnimation = loader.animate(loading, loadigTiming);

      const closeEvent = this.close;

      close.onclick = function() {
        this.dispatchEvent(closeEvent);
      }

      shadowRoot.addEventListener('close', () => {
        wrapper.classList.remove('open');
        this['open'] = false;
      })

      if (this['open'] === true) {
        instance.querySelector('.wrapper').classList.add('open');
      }

      loadAnimation.play();
      let blogModal = this;

      setTimeout(function() {
        loadAnimation.finish();
        loader.classList.add('close');
        title.innerHTML = blogModal['title'];
        subtitle.innerHTML = blogModal['subtitle'];
        synopsis.innerHTML = blogModal['synopsis'];
        cover.src = blogModal['cover'];
      }, 3000)
    
      shadowRoot.appendChild(instance);
    } else {
      shadowRoot.innerHTML = '<p>Shadow Root failed. Please try again later.</p>';
    }
  }

 

}

customElements.define('blog-modal', BlogModal);