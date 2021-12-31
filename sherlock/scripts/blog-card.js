const titles = [
  {title: 'Title 1', subtitle: 'subtitle 1'},
  {title: 'Title 2', subtitle: 'subtitle 2'},
  {title: 'Title 3', subtitle: 'subtitle 3'},
  {title: 'Title 4', subtitle: 'subtitle 4'},
]
class BlogCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'});
  }


  connectedCallback() {
   this.render()
  }

  render(){
    const { shadowRoot } = this
    const templateNode = document.getElementById('card-template');

    shadowRoot.innerHTML = '';
    
    if (templateNode) {
      titles.forEach(title => {
        const instance = document.importNode(templateNode.content, true);
        instance.querySelector('.title').innerHTML = title.title;
        instance.querySelector('.subtitle').innerHTML = title.subtitle;
       
        shadowRoot.appendChild(instance);
      })
    }else{
      shadowRoot.innerHTML = '<p>Shadow root failed. Please try again</p>';
    }
  }
}
customElements.define('blog-card', BlogCard);