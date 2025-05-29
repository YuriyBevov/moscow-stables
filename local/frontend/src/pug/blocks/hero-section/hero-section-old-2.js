import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import imagesLoaded from "imagesloaded"; // https://imagesloaded.desandro.com/

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", () => {
	const hero = document.querySelector(".hero");

	if (!hero) return;

	// Ожидаем загрузки шрифтов
	document.fonts.ready.then(() => {
		// Собираем все изображения внутри .hero
		const images = Array.from(body.querySelectorAll("img"));

		// Ожидаем загрузки всех изображений
		imagesLoaded(images, (instance) => {
			if (instance.isComplete) {
				initAnimations(); // Запускаем анимации после всех условий
			}
		});
	});

	function initAnimations() {
		const titleLeft = ".hero-title img:first-child";
		const titleRight = ".hero-title img:last-child";
		const bgImage = ".hero-bg img";

		// Основной ScrollTrigger
		ScrollTrigger.create({
			trigger: ".hero",
			start: "top top",
			end: "+=80%",
			pin: true,
			scrub: 1,
			markers: false,
			onUpdate: (self) => {
				const progress = self.progress;

				// Анимация заголовка
				gsap.to(titleLeft, {
					x: -window.innerWidth * progress * 2,
					opacity: Math.max(0, 1 - progress * 1.5),
					ease: "none",
				});
				gsap.to(titleRight, {
					x: window.innerWidth * progress * 2,
					opacity: Math.max(0, 1 - progress * 1.5),
					ease: "none",
				});

				// Изменение масштаба фонового изображения по скроллу
				const scaleValue = gsap.utils.mapRange(0, 1, 0.8, 1, progress);
				const blurValue = gsap.utils.mapRange(0.6, 0.7, 0, 4, progress);

				gsap.to(bgImage, {
					scale: scaleValue,
					yPercent: gsap.utils.mapRange(0, 1, 50, 0, progress),
					filter: `blur(${Math.min(blurValue, 4)}px)`,
					duration: 0.6,
				});
			},
		});
	}
});
