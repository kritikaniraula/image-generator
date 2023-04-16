
const searchParam = location.search ? location.search.split("=").pop() : "";
const access_key = 'KYzX_XYqP9UOSGfLS-GeKpUJz48Axq49tJXcRdzhjBQ';

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
let search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`;

const gallery = document.querySelector('.gallery');


let currentImages = 0;
let allImages;


const getImages = () => {
  fetch(random_photo_url)
  .then(res => res.json())
  .then(data => {
    allImages = data;
    makeImages(allImages);
  });
}

const searchImages = () => {
  fetch(search_photo_url)
  .then(res => res.json())
  .then(data => {
    allImages = data.results;
    makeImages(allImages);
  });
}



const searchForm = document.querySelector('.search-box form');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting and refreshing the page
  const searchInput = document.querySelector('#search-input');
  const searchTerm = searchInput.value.trim(); // get the search term entered by the user
  if (searchTerm !== '') {
    search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchTerm}&per_page=50`;
    gallery.innerHTML = ''; // clear the gallery before making a new search
    searchImages();
  }
});

const makeImages = (data) => {
  data.forEach((item, index) => {
    let img =document.createElement('img');
    img.src =item.urls.regular;
    img.className= 'gallery-image';

    gallery.appendChild(img);

    img.addEventListener('click', () =>{
      currentImages = index;
      showPopup(item);
    })
  })
}


const showPopup = (item) =>{
  let popup = document.querySelector('.image-popup');
  const download = document.querySelector('.download-btn');
  const favrouite = document.querySelector('.favrouite-btn');
  const close = document.querySelector('.close-btn');
  const image = document.querySelector('.open-image');
  let search =document.querySelector('.search-box');

  popup.classList.remove('hide');
  download.href= item.links.html;
  image.src=item.urls.regular;

  close.addEventListener('click', () => {
    popup.classList.add('hide');
  })

  favrouite.addEventListener('click', () => {
    if (icon.style.color === "") {
      icon.style.color = "white";
      icon.style.background = "red";
      icon.style.border = "none";
    } 
    else {
      icon.style.color = "";
      icon.style.background = "";
      icon.style.border = "";
    }
  })
}



if(searchParam == ''){
  getImages();
}else{
  searchImages();
}



const prebtn = document.querySelector('.pre-btn');
const nextbtn = document.querySelector('.next-btn');

prebtn.addEventListener('click', () =>{
  if(currentImages > 0){
    currentImages--;
    showPopup(allImages[currentImages]);
  }
})

nextbtn.addEventListener('click', () => {
  if (currentImages < allImages.length - 1) {
    currentImages++;
    showPopup(allImages[currentImages]);
  }
});



