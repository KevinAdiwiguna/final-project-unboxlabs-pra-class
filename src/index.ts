interface carDetail {
  images: {
    tm: string
    img1: string
    img2: string
    img3: string
  }
  merk: string
  model: string
  productionYear: string
  price: string
  torque: string
}

class Car {
  private carProduct: carDetail[] = [{
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
  },]

  constructor() { }

  // set new product
  public addProduct(newProduct: carDetail): void {
    this.carProduct.push({
      ...newProduct,
    })
  }

  // show Product
  public getProduct(): void {
    const data: HTMLElement | null = document.querySelector('#container');
    const mapping: string = this.carProduct.map((res) =>
      `
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
    `).join('');
    data!.innerHTML = mapping
  }
  // delete Product
  public deleteProductByModel(model: string): void {
    const index = this.carProduct.findIndex(product => product.model === model);
    if (index !== -1) {
      this.carProduct.splice(index, 1);
    }
  }
}

// ==========================================================================================================

const obj = new Car()

interface ImageValue {
  target: {
    src: string;
  };
}

window.addEventListener('load', () => obj.getProduct())

const closeBtnCar = () => document.getElementById('modal-new')!.style.display = 'none'
const openBtnCar = () => document.getElementById('modal-new')!.style.display = 'block'

let card: any;

const modal = (event: any) => {
  card = event.currentTarget;
  const imagebox = document.querySelector<HTMLImageElement>('#imagebox');
  const img1 = document.querySelector<HTMLImageElement>('#img1');
  const img2 = document.querySelector<HTMLImageElement>('#img2');
  const img3 = document.querySelector<HTMLImageElement>('#img3');
  const title = document.querySelector<HTMLElement>('#title');
  const productionYear = document.querySelector<HTMLElement>('#Production-time');
  const price = document.querySelector<HTMLElement>('#Production-price');
  const torque = document.querySelector<HTMLElement>('#Production-torque');

  imagebox!.setAttribute('src', card!.getAttribute('data-tm'));
  img1!.setAttribute('src', card!.getAttribute('data-img1'));
  img2!.setAttribute('src', card!.getAttribute('data-img2'));
  img3!.setAttribute('src', card!.getAttribute('data-img3'));
  title!.textContent = card!.getAttribute('data-title') || '';
  productionYear!.textContent = card!.getAttribute('data-productionYear') || '';
  torque!.textContent = card!.getAttribute('data-torque') || '';

  const modal = document.querySelector<HTMLElement>('#container-modal');
  modal!.style.display = 'block';
};


const deleteItems = () => {
  const data = card.getAttribute('data-model')
  obj.deleteProductByModel(data)
  obj.getProduct()
  document.getElementById('container-modal')!.style.display = 'none';
}


const changeImg = (value: ImageValue) => {
  const imagebox = document.querySelector('#imagebox') as HTMLImageElement | null;
  imagebox!.src = value.target.src;
};
const modalClose = () => {
  document.getElementById('container-modal')!.style.display = 'none';
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      document.getElementById('container-modal')!.style.display = 'none';
    }
  })
}
const addCar = document.querySelector('#form-add-car') as HTMLFormElement;

addCar!.addEventListener!('submit', (e) => {
  e.preventDefault();

  const imageBox = (document.querySelector('#thumbnail') as HTMLInputElement).files;
  const img1 = (document.querySelector('input[name="img1"]') as HTMLInputElement).files;
  const img2 = (document.querySelector('input[name="img2"]') as HTMLInputElement).files;
  const img3 = (document.querySelector('input[name="img3"]') as HTMLInputElement).files;
  const model = document.querySelector<HTMLInputElement>('#model')!.value;
  const productionYear = document.querySelector<HTMLInputElement>('#production-year')!.value;
  const price = document.querySelector<HTMLInputElement>('#price')!.value;
  const torque = document.querySelector<HTMLInputElement>('#torque')!.value;

  if(imageBox && img1 && img2 && img3 && model && productionYear && price && torque ) {
    const imageBoxFile = imageBox[0];
    const img1File = img1[0];
    const img2File = img2[0];
    const img3File = img3[0];

    const imageBoxReader = new FileReader();
    const img1Reader = new FileReader();
    const img2Reader = new FileReader();
    const img3Reader = new FileReader();

    imageBoxReader.onload = () => {
      const imageBoxUrl = imageBoxReader.result as string;
      const img1Url = img1Reader.result as string;
      const img2Url = img2Reader.result as string;
      const img3Url = img3Reader.result as string;

      const modal = document.querySelector<HTMLElement>('#modal-new');
      modal!.style.display = "none";
      
      obj.addProduct({
        images: {
          tm: imageBoxUrl,
          img1: img1Url,
          img2: img2Url,
          img3: img3Url,
        },
        merk: "Tesla",
        model: model,
        productionYear: productionYear,
        price: price,
        torque: torque,
      });
      obj.getProduct()
      addCar.reset()

    }

    img1Reader.onload = () => {
      imageBoxReader.readAsDataURL(imageBoxFile);
    };
    img2Reader.onload = () => {
      img1Reader.readAsDataURL(img1File);
    };
    img3Reader.onload = () => {
      img2Reader.readAsDataURL(img2File);
    };
    img3Reader.readAsDataURL(img3File);
  }

});

