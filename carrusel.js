const carruselImgs = document.querySelectorAll(".carousel-images img");
const btnPrev = document.querySelector(".carousel-button.prev");
const btnNext = document.querySelector(".carousel-button.next");

let indice = 0;

function mostrarImagen(i) {
    carruselImgs.forEach((img, idx) => {
        img.classList.remove("active");
        if (idx === i) {
            img.classList.add("active");
        }
    });
}

if (carruselImgs.length > 0 && btnPrev && btnNext) {
    btnPrev.addEventListener("click", () => {
        indice = (indice - 1 + carruselImgs.length) % carruselImgs.length;
        mostrarImagen(indice);
    });

    btnNext.addEventListener("click", () => {
        indice = (indice + 1) % carruselImgs.length;
        mostrarImagen(indice);
    });

    setInterval(() => {
        indice = (indice + 1) % carruselImgs.length;
        mostrarImagen(indice);
    }, 5000);

    mostrarImagen(indice);
}
