"use strict";class Car{constructor(){this.carProduct=[{images:{tm:"./images/teslas/tm.jpg",img1:"./images/teslas/img1.webp",img2:"./images/teslas/2.jpg",img3:"./images/teslas/3.jpg"},merk:"Tesla",model:"Model S",productionYear:"June 22, 2012",price:"$91,380",torque:"1,050 pounds feet"},{images:{tm:"./images/teslax/tm.jpg",img1:"./images/teslax/1.jpg",img2:"./images/teslax/2.webp",img3:"./images/teslax/3.jpg"},merk:"Tesla",model:"Model X",productionYear:"September 2015",price:"$99,130",torque:"420 N\xb7m"},]}addProduct(e){this.carProduct.push(Object.assign({},e))}getProduct(){let e=document.querySelector("#container"),t=this.carProduct.map(e=>`<div id="card" ><div class="card-car" id="card-car" onClick="modal(event)" data-model="${e.model}" data-title="${e.merk} ${e.model}" data-tm="${e.images.tm}" data-img1="${e.images.img1}" data-img2="${e.images.img2}" data-img3="${e.images.img3}" data-price="${e.price}" data-productionYear="${e.productionYear}" data-torque="${e.torque}"><div><img style="width: 300px; height: 200px;" src="${e.images.tm}" alt="${e.model}"></div><div class="card-text"><h3>${e.merk} ${e.model}</h3><p><span style="font-weight: 700;">Production Year : </span> ${e.productionYear}</p><p><span style="font-weight: 700;">Price Start from : </span> ${e.price}</p><p><span style="font-weight: 700;">Torque : </span> ${e.torque}</p></div></div></div>`).join("");e.innerHTML=t}deleteProductByModel(e){let t=this.carProduct.findIndex(t=>t.model===e);-1!==t&&this.carProduct.splice(t,1)}}const obj=new Car;window.addEventListener("load",()=>obj.getProduct());const closeBtnCar=()=>document.getElementById("modal-new").style.display="none",openBtnCar=()=>document.getElementById("modal-new").style.display="block";let card;const modal=e=>{card=e.currentTarget;let t=document.querySelector("#imagebox"),a=document.querySelector("#img1"),r=document.querySelector("#img2"),d=document.querySelector("#img3"),o=document.querySelector("#title"),i=document.querySelector("#Production-time");document.querySelector("#Production-price");let l=document.querySelector("#Production-torque");t.src=card.getAttribute("data-tm"),a.src=card.getAttribute("data-img1"),r.src=card.getAttribute("data-img2"),d.src=card.getAttribute("data-img3"),o.textContent=card.getAttribute("data-title")||"",i.textContent=card.getAttribute("data-productionYear")||"",l.textContent=card.getAttribute("data-torque")||"";let m=document.querySelector("#container-modal");m.style.display="block"},deleteItems=()=>{let e=card.getAttribute("data-model");obj.deleteProductByModel(e),obj.getProduct(),document.getElementById("container-modal").style.display="none"},changeImg=e=>{let t=document.querySelector("#imagebox");t.src=e.target.src},modalClose=()=>{document.getElementById("container-modal").style.display="none"},addCar=document.querySelector("#form-add-car");addCar.addEventListener("submit",e=>{e.preventDefault();let t=["#thumbnail",'input[name="img1"]','input[name="img2"]','input[name="img3"]'],a=t.map(e=>{let t=document.querySelector(e).files;return t?t[0]:null}),[r,d,o,i]=a,l=["#model","#production-year","#price","#torque"],m=l.map(e=>{let t=document.querySelector(e);return t?t.value:null}),[c,n,s,g]=m;if(r&&d&&o&&i&&c&&n&&s&&g){let u=[new FileReader,new FileReader,new FileReader,new FileReader],p=(e,t)=>new Promise((a,r)=>{e.onload=()=>{a(e.result)},e.onerror=r,e.readAsDataURL(t)});Promise.all(u.map((e,t)=>p(e,a[t]))).then(([e,t,a,r])=>{let d=document.querySelector("#modal-new");d.style.display="none",obj.addProduct({images:{tm:e,img1:t,img2:a,img3:r},merk:"Tesla",model:c,productionYear:n,price:s,torque:g}),obj.getProduct(),addCar.reset()})}});