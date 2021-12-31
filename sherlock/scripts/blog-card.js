// const titles = [
//   {title: 'Title 1', subtitle: 'subtitle 1'},
//   {title: 'Title 2', subtitle: 'subtitle 2'},
//   {title: 'Title 3', subtitle: 'subtitle 3'},
//   {title: 'Title 4', subtitle: 'subtitle 4'},
// ]
class BlogCard extends HTMLElement {
  // attrs observer
  static get observedAttributes(){
    return ['title', 'subtitle', 'cover']
  }
  
  // constructor
  constructor() {
    super()
    this.attachShadow({mode: 'open'});
  }

  // callbacks
  connectedCallback() {
   this.render()
  }

  disconectCallback() {
    console.log('Disconnect from the DOM')
  }

  attributeChangedCallback(attrName, oldValue, newValue){
    if (oldValue !== newValue && newValue !== null) {
      this[attrName] = newValue;
    }
  }

  // getters and setters
  get title(){
    return this.getAttribute('title');
  }

  get subtitle(){
    return this.getAttribute('subtitle');
  }

  get cover(){
    return this.getAttribute('cover');
  }

  set title(value) {
    if(value){
      this.setAttribute('title', value)
    } else {
      this.removeAttribute('title')
    }
  }

  set subtitle(value) {
    if(value){
      this.setAttribute('subtitle', value)
    } else {
      this.removeAttribute('subtitle')
    }
  }

  set cover(value) {
    if(value){
      this.setAttribute('cover', value)
    } else {
      this.removeAttribute('cover')
    }
  }

  // component render
  render(){
    const { shadowRoot } = this
    const templateNode = document.getElementById('card-template');

    shadowRoot.innerHTML = '';
    
    if (templateNode) {
      
      const instance = document.importNode(templateNode.content, true);
      instance.querySelector('.title').innerHTML = this['title'];
      instance.querySelector('.subtitle').innerHTML = this['subtitle'];
      instance.querySelector('.cover').src = this['cover'];

      shadowRoot.appendChild(instance);
      
    }else{
      shadowRoot.innerHTML = '<p>Shadow root failed. Please try again</p>';
    }
  }
}
customElements.define('blog-card', BlogCard);

// document.querySelector('blog-card').remove() //disconnecting the component from de DOM
