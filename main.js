(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{G:()=>Y,x:()=>z});var t=document.querySelector("#pop-up-edit-profile"),n=document.querySelector("#pop-up-edit-avatar"),r=document.querySelector("#edit-form-avatar"),o=document.querySelector("#pop-up-delete-picture"),c=(document.querySelector("#edit-form-avatar"),document.querySelector(".profile__button-edit")),u=t.querySelector(".pop-up__form"),a=u.querySelector("#name"),i=u.querySelector("#description"),l=document.querySelector(".profile"),s=l.querySelector(".profile__name"),d=l.querySelector(".profile__status"),f=l.querySelector(".profile__avatar"),p=document.querySelector(".table"),v=document.querySelector("#template-card").content,_=document.querySelector("#pop-up-edit-picture"),m=document.querySelector(".profile__button-add"),y=document.querySelector("#edit-form-picture"),h=document.querySelector(".picture"),b=t.querySelector("#name"),S=t.querySelector("#description"),q=_.querySelector("#name"),g=_.querySelector("#description"),L=h.querySelector("#name"),E=h.querySelector("#description"),k=y.querySelector("#name"),x=y.querySelector("#description"),C=r.querySelector("#url"),U=".pop-up__form",w=".pop-up__text",A=".pop-up__button-save",T="pop-up__text_invalid",P="pop-up__button_save_type-inactive",O=function(e){var t=Array.from(e.elements).filter((function(e){return"INPUT"===e.nodeName})),n=e.querySelector(A);t.forEach((function(t){D(e,t)})),N(t,n)},D=function(e,t){var n=e.querySelector(".pop-up__text-".concat(t.id,"-error"));t.classList.remove(T),n.textContent=""},N=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(P),t.removeAttribute("disabled")):(t.classList.add(P),t.setAttribute("disabled",!0))};function j(e){e.classList.remove("pop-up_opened"),e.removeEventListener("mousedown",H),document.removeEventListener("keydown",M)}function J(e){e.classList.add("pop-up_opened"),e.addEventListener("mousedown",H),document.addEventListener("keydown",M)}function M(e){"Escape"===e.key&&j(document.querySelector(".pop-up_opened"))}function H(e){(e.target.classList.contains("pop-up")||e.target.classList.contains("popup__close"))&&j(e.currentTarget)}var z,G={baseUrl:"https://nomoreparties.co/v1/plus-cohort-18/",headers:{authorization:"95e1c598-7d7b-4945-aa63-eed177f7d6d7","Content-Type":"application/json"}},I=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function B(e,t){e.textContent=t?"Сохранение...":"Сохраненить"}function F(e,t){e.textContent=t?"Удаление...":"Да"}function K(e){J(o),o.id=e.target.parentElement.id,o.card=e.target.closest(".table__card"),o.addEventListener("submit",R)}function Q(e,t){(function(e,t){return fetch("".concat(G.baseUrl,"cards/likes/").concat(t),{method:e,headers:G.headers}).then((function(e){return I(e)}))})(e,t.id).then((function(e){t.textContent=e.likes.length})).catch((function(e){return console.log(e)}))}function R(e){e.preventDefault();var t,n=e.target.querySelector(".pop-up__button-save");return F(n,!0),(t=o.id,fetch("".concat(G.baseUrl,"cards/").concat(t),{method:"DELETE",headers:G.headers}).then((function(e){return I(e)}))).then((function(){o.card.remove(),j(o),o.removeEventListener("submit",R)})).catch((function(e){return console.log(e)})).finally((function(){return F(n,!1)}))}function V(e){var t=e.target.parentElement.querySelector(".table__like");e.target.classList.contains("table__button-like_active")?Q("DELETE",t):Q("PUT",t),e.target.classList.toggle("table__button-like_active")}function W(e,t,n,r,o,c){var u=v.querySelector(".table__card").cloneNode(!0);u.id=t;var a=u.querySelector(".table__photo"),i=u.querySelector(".table__like");a.src=r,a.alt=n,i.textContent=o.length,i.id=t,u.querySelector(".table__name").textContent=n;var l=u.querySelector(".table__button-like");c&&l.classList.add("table__button-like_active"),l.addEventListener("click",V);var s=u.querySelector(".table__button-remove");return s.addEventListener("click",K),z===e&&s.classList.add("table__button-remove_active"),a.addEventListener("click",(function(){J(h),Y(r,n)})),u}function X(){C.value=""}function Y(e,t){L.src=e,L.alt=t,E.textContent=t}function Z(e){s.textContent=e.name,d.textContent=e.about,f.src=e.avatar,z=e._id}Array.from(document.querySelectorAll(U)).forEach((function(e){!function(e){var t=Array.from(e.querySelectorAll(w)),n=e.querySelector(A);N(t,n),t.forEach((function(r){r.addEventListener("input",(function(){(function(e,t){t.validity.valid?D(e,t,T):function(e,t,n){var r=e.querySelector(".pop-up__text-".concat(t.id,"-error"));r&&(t.classList.add(T),t.validity.patternMismatch&&(n=t.dataset.errorMessage),n&&(r.textContent=n))}(e,t,t.validationMessage)})(e,r),N(t,n)}))}))}(e)})),fetch("".concat(G.baseUrl,"users/me"),{headers:G.headers}).then((function(e){return I(e)})).then((function(e){return Z(e)})).then((function(){return fetch("".concat(G.baseUrl,"cards"),{headers:G.headers}).then((function(e){return I(e)})).then((function(e){e.forEach((function(e){p.append(W(e.owner._id,e._id,e.name,e.link,e.likes,e.likes.some((function(t){return t._id===e.owner._id}))))}))})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)})),c.addEventListener("click",(function(){b.value=s.textContent,S.value=d.textContent,O(u),J(t)})),m.addEventListener("click",(function(){q.value="",g.value="",O(y),J(_)})),f.addEventListener("click",(function(){X(),O(r),J(n)})),u.addEventListener("submit",(function(e){e.preventDefault();var n,r,o=e.target.querySelector(".pop-up__button-save");B(o,!0),(n=a.value,r=i.value,fetch("".concat(G.baseUrl,"users/me"),{method:"PATCH",body:JSON.stringify({name:n,about:r}),headers:G.headers}).then((function(e){return I(e)}))).then((function(e){Z(e),j(t)})).catch((function(e){return console.log(e)})).finally((function(){return B(o,!1)}))})),y.addEventListener("submit",(function(e){e.preventDefault();var t,n=e.target.querySelector(".pop-up__button-save");B(n,!0),(t={name:k.value,link:x.value},function(e){return fetch("".concat(G.baseUrl,"cards"),{method:"POST",body:JSON.stringify(e),headers:G.headers}).then((function(e){return I(e)}))}(t).then((function(e){return p.prepend(W(e.owner._id,e._id,e.name,e.link,e.likes,e.likes.some((function(t){return t._id===e.owner._id}))))})).catch((function(e){return console.log(e)}))).then((function(){j(_)})).catch((function(e){return console.log(e)})).finally((function(){return B(n,!1)}))})),r.addEventListener("submit",(function(e){e.preventDefault();var t,r=e.target.querySelector(".pop-up__button-save");B(r,!0),(t=C.value,fetch("".concat(G.baseUrl,"users/me/avatar"),{method:"PATCH",body:JSON.stringify({avatar:t}),headers:G.headers}).then((function(e){return I(e)}))).then((function(e){f.src=e.avatar,j(n),X(),B(r,!1)})).catch((function(e){return console.log(e)})).finally((function(){return B(r,!1)}))}))})();