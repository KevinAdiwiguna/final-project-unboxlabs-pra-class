"use strict";
class Car {
    constructor() {
        this.carProduct = [{
                images: {
                    tm: "./images/teslas/tm.jpg",
                    img1: "./images/teslas/img1.webp",
                    img2: "./images/teslas/2.jpg",
                    img3: "./images/teslas/3.jpg",
                },
                merk: "Tesla",
                model: "Model S",
                productionYear: "June 22, 2012",
                price: "$91,380",
                torque: "1,050 pounds feet"
            },
            {
                images: {
                    tm: "./images/teslax/tm.jpg",
                    img1: "./images/teslax/1.jpg",
                    img2: "./images/teslax/2.webp",
                    img3: "./images/teslax/3.jpg",
                },
                merk: "Tesla",
                model: "Model X",
                productionYear: "September 2015",
                price: "$99,130",
                torque: "420 N·m"
            },];
    }
    // set new product
    addProduct(newProduct) {
        this.carProduct.push(Object.assign({}, newProduct));
    }
    // show Product
    getProduct() {
        const data = document.querySelector('#container');
        const mapping = this.carProduct
            .map((res) => `
        <div id="card" >
          <div class="card-car" id="card-car" onClick="modal(event)" data-model="${res.model}" data-title="${res.merk} ${res.model}" data-tm="${res.images.tm}" data-img1="${res.images.img1}" data-img2="${res.images.img2}" data-img3="${res.images.img3}" data-price="${res.price}" data-productionYear="${res.productionYear}" data-torque="${res.torque}">
              <div>
                  <img style="width: 300px; height: 200px;" src="${res.images.tm}" alt="${res.model}">
              </div>
              <div class="card-text">
                  <h3>${res.merk} ${res.model}</h3>
                  <p><span style="font-weight: 700;">Production Year : </span> ${res.productionYear}</p>
                  <p><span style="font-weight: 700;">Price Start from : </span> ${res.price}</p>
                  <p><span style="font-weight: 700;">Torque : </span> ${res.torque}</p>
              </div>
          </div>
        </div>
      `)
            .join('');
        data.innerHTML = mapping;
    }
    // delete Product
    deleteProductByModel(model) {
        const index = this.carProduct.findIndex(product => product.model === model);
        if (index !== -1) {
            this.carProduct.splice(index, 1);
        }
    }
}
// ==========================================================================================================
const obj = new Car();
window.addEventListener('load', () => obj.getProduct());
const closeBtnCar = () => document.getElementById('modal-new').style.display = 'none';
const openBtnCar = () => document.getElementById('modal-new').style.display = 'block';
let card;
const modal = (event) => {
    card = event.currentTarget;
    const imagebox = document.querySelector('#imagebox');
    const img1 = document.querySelector('#img1');
    const img2 = document.querySelector('#img2');
    const img3 = document.querySelector('#img3');
    const title = document.querySelector('#title');
    const productionYear = document.querySelector('#Production-time');
    const price = document.querySelector('#Production-price');
    const torque = document.querySelector('#Production-torque');
    imagebox.src = card.getAttribute('data-tm');
    img1.src = card.getAttribute('data-img1');
    img2.src = card.getAttribute('data-img2');
    img3.src = card.getAttribute('data-img3');
    title.textContent = card.getAttribute('data-title') || '';
    productionYear.textContent = card.getAttribute('data-productionYear') || '';
    torque.textContent = card.getAttribute('data-torque') || '';
    const modal = document.querySelector('#container-modal');
    modal.style.display = 'block';
};
const deleteItems = () => {
    const data = card.getAttribute('data-model');
    obj.deleteProductByModel(data);
    obj.getProduct();
    document.getElementById('container-modal').style.display = 'none';
};
const changeImg = (value) => {
    const imagebox = document.querySelector('#imagebox');
    imagebox.src = value.target.src;
};
const modalClose = () => {
    document.getElementById('container-modal').style.display = 'none';
};
const addCar = document.querySelector('#form-add-car');
addCar.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInputs = [
        '#thumbnail',
        'input[name="img1"]',
        'input[name="img2"]',
        'input[name="img3"]'
    ];
    const values = fileInputs.map((selector) => {
        const fileInput = document.querySelector(selector).files;
        return fileInput ? fileInput[0] : null;
    });
    const [imageBoxFile, img1File, img2File, img3File] = values;
    const inputValues = [
        '#model',
        '#production-year',
        '#price',
        '#torque'
    ];
    const inputObjects = inputValues.map((selector) => {
        const input = document.querySelector(selector);
        return input ? input.value : null;
    });
    const [model, productionYear, price, torque] = inputObjects;
    if (imageBoxFile && img1File && img2File && img3File && model && productionYear && price && torque) {
        const readers = [new FileReader(), new FileReader(), new FileReader(), new FileReader()];
        const loadFile = (reader, file) => {
            return new Promise((resolve, reject) => {
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };
        Promise.all(readers.map((reader, index) => loadFile(reader, values[index])))
            .then(([imageBoxUrl, img1Url, img2Url, img3Url]) => {
            const modal = document.querySelector('#modal-new');
            modal.style.display = "none";
            obj.addProduct({
                images: {
                    tm: imageBoxUrl,
                    img1: img1Url,
                    img2: img2Url,
                    img3: img3Url,
                },
                merk: "Tesla",
                model,
                productionYear,
                price,
                torque,
            });
            obj.getProduct();
            addCar.reset();
        });
    }
});
//# sourceMappingURL=index.js.map