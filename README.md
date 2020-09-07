# Web Components

> 캡슐화된 기능을 갖춘 다용도의 커스텀 엘리먼트 생성을 목표로함

- 커스텀 엘리먼트 : 커스텀 엘리먼트와 그 동작을 정의할 수 있도록 해주는 JS API의 집합
- Shadow DOM : 캡슐화된 그림자 DOM 트리
  - 메인 다큐먼트 DOM으로부터 독립적으로 렌더링
  - 엘리먼트의 기능을 프라이빗하게 유지 가능
  - 다큐먼트의 다른부분과 충돌 없이 스크립트 , 스타일 작성 
- HTML 템플릿 
  - < template >과 < slot >엘리먼트는 렌더링된 페이지에 나타나지 않는 마크업 템플릿을 작성할 수 있게 해준다. 
  - 커스텀 엘리먼트의 구조를 기반으로 여러번 재사용 가능 



### 요약 

- HTMLElement 를 상속받는 클래스를 정의해준다.
- customElements.define('엘리먼트 이름',클래스명 ); 메서드를 이용해 해당 클래스를 엘리먼트로 내보내준다.
- this.shadow=this.attachShadow({mode:'open'}); 를 이용해 shadow dom을 엘리먼트에 추가한다.
- HTML로부터 받아온 어트리뷰트는 getter를 이용해서 접근 가능하도록 설정해주고 setter를 이용하여 수정 가능하도록 해준다.

```javascript
    get count(){
        return this.getAttribute('count');
    }

    set count(val){
        this.setAttribute('count', val);
    }
```

- 라이프 사이클 중, connectedCallback이 호출 되면,  render를 해준다.

  



### 라이프 사이클

- connectedCallback : 커스텀 엘리먼트가 처음 다큐먼트 DOM에 연결되었을 때
- disconnectedCallback : 커스텀 엘리먼트가 다큐먼트 DOM으로부터 연결 해제 되었을 때
- adoptedCallback : 커스텀 엘리먼트가 새로운 다큐먼트로 이동되었을 때
- attributeChangedCallback:  커스텀 엘리먼트의 어트리뷰트 추가, 수정 , 제거 시 

attributeChangedCallback 예시 - 어트리뷰트가 변경되면 렌더를 해준다. 

```javascript
static get observedAttributes(){
       return ["count"];
 } // observedAttributes에 등록해주어, 수정을 감지하도록 한다.

attributeChangedCallback(prop, oldValue, newValue){
        if(prop === 'count'){
            this.render(); // update 
        }
    }
```





### 템플릿 사용

```javascript
const template = document.createElement('template');
template.innerHTML=`
<style>
    h3{
        color:coral;
    }
</style>
<div class="user-card">
   <h3>Hello</h3>
</div>
`
this.attachShadow({mode:'open'});
this.shadowRoot.appendChild(template.content.cloneNode(true));
```

- shadow DOM 자체를 바꾸는 것이 아니라 shadow DOM 내부의 상위 root에 새로운 html 템플릿을 추가하는 방식
- CSS 적용이 용이하다.