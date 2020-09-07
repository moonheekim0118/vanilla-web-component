
class MyCounter extends HTMLElement{
    constructor(){
        super();
        this.shadow=this.attachShadow({mode:'open'});
    }

    get count(){
        return this.getAttribute('count');
    }

    set count(val){
        this.setAttribute('count', val);
    }

    static get observedAttributes(){
        return ["count"];
    }

    attributeChangedCallback(prop, oldValue, newValue){
        if(prop === 'count'){
            this.reRender(); // update 
        }
    }

    increment(){
        this.count++;
    }
    connectedCallback(){
        this.reRender();
    }

    reRender(){
        this.render();
        let btn = this.shadow.querySelector('#btn');
        btn.addEventListener('click',this.increment.bind(this));
    }

    render(){
        this.shadow.innerHTML=`
        <h1>Counter</h1>
        ${this.count}
        <button id="btn">Increment</button>
        `
    }
}

customElements.define('my-counter',MyCounter );