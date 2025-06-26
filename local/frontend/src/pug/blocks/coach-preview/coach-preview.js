import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Swiper from "swiper";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger, SplitText);

function initSlider() {
	const sliderEl = document.querySelector(".coach-preview-slider");

	if (!sliderEl) return;

	let isAnimating = false; // 🚦 Флаг анимации

	const swiper = new Swiper(sliderEl, {
		modules: [EffectCoverflow],
		effect: "coverflow",

		coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 200,
			modifier: 1,
			slideShadows: false,
		},
		initialSlide: 2,
		slidesPerView: 3,
		centeredSlides: true,
		loop: true,

		on: {
			init: function () {
				gsap.set(".coach-card__content", {
					opacity: 0,
					y: 20,
				});
				const activeSlide = this.slides[this.activeIndex];
				const contentEl = activeSlide?.querySelector(".coach-card__content");
				if (contentEl) {
					gsap.to(contentEl, {
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "linear",
					});
				}
			},

			slideChangeTransitionStart: function () {
				isAnimating = true;
				this.allowSlideNext = false;
				this.allowSlidePrev = false;
				const prevSlide = this.slides[this.previousIndex];
				const prevEl = prevSlide?.querySelector(".coach-card__content");
				if (prevEl) {
					gsap.to(prevEl, {
						opacity: 0,
						y: 20,
						duration: 0.6,
						ease: "linear",
					});
				}
			},

			slideChangeTransitionEnd: function () {
				const activeSlide = this.slides[this.activeIndex];
				const contentEl = activeSlide?.querySelector(".coach-card__content");
				if (contentEl) {
					gsap.to(contentEl, {
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "linear",
						onComplete: () => {
							isAnimating = false; // ✅ Анимация закончилась → разрешаем свайп
							this.allowSlideNext = true;
							this.allowSlidePrev = true;
						},
					});
				} else {
					isAnimating = false;
					this.allowSlideNext = true;
					this.allowSlidePrev = true;
				}
			},
		},
	});
}

// document.addEventListener("DOMContentLoaded", initSlider);

function animateTitlesOnScroll() {
	const titles = document.querySelectorAll(".gsap-animated-title");

	titles.forEach((title, index) => {
		// Создаем копию заголовка
		const titleCopy = title.cloneNode(true);
		titleCopy.classList.add("base-title-copy");
		titleCopy.style.position = "absolute";
		titleCopy.style.top = "-50%";
		titleCopy.style.left = "0";
		titleCopy.style.whiteSpace = "nowrap";
		titleCopy.style.pointerEvents = "none";
		titleCopy.style.transform = "translateX(-200%)";
		titleCopy.style.opacity = "0.05";

		// Увеличиваем шрифт в 3 раза
		const computedStyle = window.getComputedStyle(title);
		const fontSize = parseFloat(computedStyle.fontSize);
		titleCopy.style.fontSize = `${fontSize * 3}px`;

		// Обёртка для позиционирования
		const wrapper = document.createElement("div");
		wrapper.style.position = "relative";
		wrapper.style.display = "inline-block";
		wrapper.style.width = "max-content";
		title.parentNode.insertBefore(wrapper, title);
		wrapper.appendChild(title);
		wrapper.appendChild(titleCopy);

		// Анимация движения + scrub по прогрессу скролла
		gsap.fromTo(
			titleCopy,
			{
				x: index % 2 === 0 ? "-210%" : "210%",
			},
			{
				x: index % 2 === 0 ? "110%" : "-110%",
				scrollTrigger: {
					trigger: wrapper,
					start: "top bottom", // начало: когда верх блока достигает низа экрана
					end: "500%", // конец: когда низ блока уходит за верх экрана
					scrub: true, // связываем с прокруткой
					markers: false, // можно включить для дебага
					invalidateOnRefresh: true, // пересчёт высоты при ресайзе
					onUpdate: (self) => {
						// По желанию: можешь использовать прогресс здесь
						console.log(`Прогресс анимации: ${self.progress.toFixed(2)}`);
					},
				},
			},
		);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	animateTitlesOnScroll();
	initSlider();
});
