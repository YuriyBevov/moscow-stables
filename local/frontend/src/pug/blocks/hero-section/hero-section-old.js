import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

document.addEventListener("DOMContentLoaded", () => {
	document.fonts.ready.then(() => {
		const isExist = document.querySelector(".hero");

		if (isExist) {
			const split = new SplitText(".hero-content p", {
				type: "lines",
			});

			gsap.set(".header", {
				y: -110,
			});

			// Анимация текста (пауза до нужного момента)
			const textAnimation = gsap.from(split.lines, {
				opacity: 0,
				y: 100,
				duration: 0.5,
				stagger: 0.05,
				ease: "linear",
				paused: true,
				overflow: "hidden",
			});

			// Пин-анимация при скролле
			ScrollTrigger.create({
				trigger: ".hero",
				start: "clamp(top top)",
				end: "+=150%",
				pin: true,
				scrub: 1,
				markers: true,
				onUpdate: (self) => {
					const progress = self.progress;

					// Анимация заголовка начало
					gsap.to(".hero-title img:first-child", {
						x: -window.innerHeight * progress * 2.7,
						opacity: 1 - progress * 1.2,
						ease: "none",
					});
					gsap.to(".hero-title img:last-child", {
						x: window.innerHeight * progress * 2.5,
						opacity: 1 - progress * 1.2,
						ease: "none",
					});

					if (progress > 0.25) {
						console.log("start");
					}
					// Анимация заголовка конец
					// const clampedProgress = gsap.utils.clamp(
					// 	"-10vh",
					// 	"-30vh",
					// 	`-${30 + progress * 5}vh`,
					// );
					// Анимация фона начало
					gsap.to(".hero-bg", {
						// filter: progress > 0.75 ? `blur(30px)` : "none",
						y: progress > 0.25 ? `-${30 + progress * 5}vh` : "-10vh",
						// y: clampedProgress,

						// gsap.to(element, { opacity: clampedProgress });
					});

					gsap.to(".hero-bg img", {
						height: progress > 0.25 ? `100vh` : "50vh",
						width: progress > 0.25 ? "100vw" : "95vw",
						duration: 2,
					});
					// Анимация фона конец

					if (progress > 0.85) {
						gsap.to("header", {
							y: 0,
						});
					} else {
						gsap.to("header", {
							y: -110,
						});
					}

					// Анимация текста начало
					if (progress > 0.75) {
						textAnimation.play();
					} else {
						textAnimation.reverse();
					}
					// Анимация текста конец
				},
			});
		}
	});
});

// ------

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

document.addEventListener("DOMContentLoaded", () => {
	document.fonts.ready.then(() => {
		const isExist = document.querySelector(".hero");

		if (isExist) {
			const text = new SplitText(".hero-content .main-text", {
				type: "lines",
			});

			const textAnimation = gsap.from(text.lines, {
				opacity: 0,
				y: 100,
				duration: 0.5,
				stagger: 0.05,
				ease: "linear",
				paused: true,
				overflow: "hidden",
			});

			ScrollTrigger.create({
				trigger: ".hero",
				start: "top top",
				end: "+=100%",
				pin: true,
				scrub: 1,
				markers: true,
				onUpdate: (self) => {
					const progress = self.progress;

					gsap.to(".hero-title img:first-child", {
						x: -window.innerHeight * progress * 2.4,
						opacity: 1 - progress * 1.2,
						ease: "none",
					});
					gsap.to(".hero-title img:last-child", {
						x: window.innerHeight * progress * 2.4,
						opacity: 1 - progress * 1.8,
						ease: "none",
					});

					if (progress > 0.25) {
						gsap.to(".hero-bg img", {
							scale: 1,
							yPercent: 0,
						});
					} else {
						gsap.to(".hero-bg img", {
							scale: 0.8,
							yPercent: 50,
						});
					}

					if (progress > 0.65) {
						gsap.to(".hero-bg img", {
							filter: "blur(4px)",
							duration: 2,
						});

						// gsap.to(".hero-section--bottom", {
						// 	// yPercent: -100,
						// 	onComplete: () => {
						// 		textAnimation.play();
						// 	},
						// });
					} else {
						gsap.to(".hero-bg img", {
							filter: "blur(0px)",
							duration: 2,
						});
						// gsap.to(".hero-section--bottom", {
						// 	yPercent: 0,
						// 	onComplete: () => {
						// 		textAnimation.reverse();
						// 	},
						// });
					}
				},
			});
		}
	});
});
