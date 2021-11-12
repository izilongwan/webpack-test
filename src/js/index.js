console.log(0);

import pic1 from '../images/1.webp'
import pic2 from '../images/2.webp'

const $ = document.querySelector.bind(document);

prevImgLoad(pic1);
prevImgLoad(pic2);

function prevImgLoad(url) {
  const oImg = new Image();

  oImg.src = url;
  oImg.onload = () => $('body').append(oImg);
}

module?.hot?.accept()
