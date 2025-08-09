let currentIndex = 1;
let totalImages = 7;

const updateActiveImage = () => {
    document.querySelectorAll(".title").forEach((img, index) => {
        if (index === currentIndex) {
            img.classList.add("active");
        } else {
            img.classList.remove("active");
        }
    });
};

const handleSlider = () => {
    if (currentIndex < totalImages) {
        currentIndex++;
    } else {
        currentIndex = 1;
    }

    gsap.to(".slide-title", {
        onStart: () => {
            setTimeout(() => {
                updateActiveImage();
            }, 100);

            updateImage(currentIndex + 1);
        },
        x: `-${(currentIndex - 1) * 11.1111}%`,
        duration: 2,
        ease: "power4.out",
    });
};

const updateImage = (index) => {
    const imgSrc = `./assets/images/slide${currentIndex}.jpg`;
    const imgTop = document.createElement("img");
    const imgBottom = document.createElement("img");

    imgTop.src = imgSrc;
    imgBottom.src = imgSrc;

    imgTop.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    imgBottom.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";

    imgTop.style.transform = "scale(2)";
    imgBottom.style.transform = "scale(2)";

    document.querySelector(".img-top").appendChild(imgTop);
    document.querySelector(".img-bottom").appendChild(imgBottom);

    gsap.to([imgTop, imgBottom], {
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
        transform: "scale(1)",
        duration: 2,
        ease: "power4.out",
        stagger: 0.15,
        onComplete: trimImages,
    });
};

const trimImages = () => {
    const selectors = [".img-top", ".img-bottom"];

    selectors.forEach((selector) => {
        const container = document.querySelector(selector);
        const images = Array.from(container.querySelectorAll("img"));
        const excessImages = images.length - 5;

        if (excessImages > 0) {
            images.slice(0, excessImages).forEach((image) => {
                container.removeChild(image);
            });
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", handleSlider);

    updateImage(2);
    updateActiveImage();
});
