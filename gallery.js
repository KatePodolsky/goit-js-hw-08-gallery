import gallery from "./gallery-items.js";

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxModal: document.querySelector('.lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightboxOverlay:document.querySelector('.lightbox__overlay')
}

const galleryMarkup = createGalleryMarkup (gallery)

refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup)

refs.gallery.addEventListener('click', onGallaryContainerClick);
refs.lightboxModal.addEventListener('click', modalEvent);
refs.lightboxOverlay.addEventListener('click',modalEvent)
window.addEventListener('keydown', modalEvent)


function createGalleryMarkup(galleryItems) {
    return galleryItems
        .map(({ preview, original,description}, idx) => {
            return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                data-index="${idx}"
                />
            </a>
        </li>`;           

    })
        .join('');
}

function onGallaryContainerClick(e) {
    e.preventDefault();
    const swatchGallery = e.target;
    if (!swatchGallery.classList.contains('gallery__image')) {
        return;
       }
    refs.lightboxModal.classList.add('is-open');
    
    refs.lightboxImage.src = swatchGallery.dataset.source;
    refs.lightboxImage.dataset.index = swatchGallery.dataset.index
}

function modalEvent(e) {
    if (refs.lightboxModal.classList.contains('is-open')) {
        if (e.target.nodeName === "BUTTON") {
            onCloseModal()
        }

        if (e.target.classList.contains('lightbox__overlay')) {
            onCloseModal()
        }
    
        if (e.code === "Escape") {
            onCloseModal()
        }

        if (e.code === "ArrowLeft") {
            switchLeft()
        }
        
        if (e.code === "ArrowRight") {
            switchRight()
        }
        
    }
}
      
function onCloseModal() {
        refs.lightboxModal.classList.remove('is-open');
        refs.lightboxImage.src = "";
}

function addNextSrc(step, idx) {
    
    refs.lightboxImage.dataset.index = `${step + idx}`
    refs.lightboxImage.src = gallery[step + idx].original   
}

function switchLeft() {
    let idx = Number(refs.lightboxImage.dataset.index);
    if (idx === 0) {
        addNextSrc(0, gallery.length - 1)
        return
    }
  addNextSrc(-1, idx)
}

function switchRight() {
    let idx = Number(refs.lightboxImage.dataset.index);
    if (idx === gallery.length - 1) {
        addNextSrc(0, 0)
        return
    }
    addNextSrc(1, idx)
}