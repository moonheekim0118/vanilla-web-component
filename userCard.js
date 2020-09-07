const template = document.createElement('template');
template.innerHTML=`
<style>
    .user-card{
        width:500px;
        display:grid;
        grid-template-columns:1fr 2fr;
        grid-gap:10px;
        margin-bottom:15px;
        border-bottom: coral 5px solid;
        background: #f4f4f4;
    }
    h3{
        color:coral;
    }
    img{
        width:70px;
        height:70px;
    }

    .user-card button{
        cursor:pointer;
        background: coral;
        border: none;
        border-radius:5px;
        padding:5px 10px;
        font-size:10px;
        width:40px;
        height:30%;
    }
</style>
<div class="user-card">
    <h3></h3>
    <div class="info">
        <p><slot name="phoneNumber"/></p>
        <p><slot name="address"/></p>
    </div>
    <img></img>
    <button id="toggleInfo">Hide</button>
</div>
`


class UserCard extends HTMLElement {
    constructor(){
        super();
        this.showInfo = true;
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText=this.name;
        this.shadowRoot.querySelector('img').src=this.avatar;
        this.innerHTML=``;
    }

    get name(){
        return this.getAttribute('name');
    }

    get avatar(){
        return this.getAttribute('avatar');
    }

    toggleInfo(){
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn= this.shadowRoot.querySelector('#toggleInfo');
        if(this.showInfo)
        {
            info.style.display='block';
            toggleBtn.innerText='hide';
        }
        else
        {
            info.style.display='none';
            toggleBtn.innerText='show';
        }
        
    }
    connectedCallback(){
        this.shadowRoot.querySelector('#toggleInfo')
        .addEventListener('click',()=>{
            this.toggleInfo();
        })
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector('#toggleInfo')
        .removeEventListener();
    }
}

window.customElements.define('user-card',UserCard);