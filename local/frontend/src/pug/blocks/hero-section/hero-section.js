import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
// import imagesLoaded from "imagesloaded"; // https://imagesloaded.desandro.com/

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", () => {
	const split = new SplitText(".hero-text", {
		type: "lines",
	});

	const textAnimation = gsap.from(split.lines, {
		opacity: 0,
		y: 100,
		duration: 0.5,
		stagger: 0.05,
		ease: "linear",
		paused: true,
		overflow: "hidden",
	});

	gsap.set(".hero-btn-row", {
		opacity: 0,
		y: 30,
	});

	const tl = gsap.timeline().pause();

	tl.fromTo(
		".hero-bg",
		{
			opacity: 0,
			yPercent: 10,
		},
		{
			yPercent: 0,
			opacity: 1,
			duration: 0.8,
		},
	);

	tl.fromTo(
		".hero-title",
		{
			opacity: 0,
		},
		{
			opacity: 1,
			duration: 1.5,
			ease: "linear",
		},
		"-=.4",
	);

	tl.play();

	gsap.fromTo(
		".hero-bg",
		{
			clipPath: "polygon(16% 10%, 84% 10%, 84% 90%, 16% 90%)",
		},
		{
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

			scrollTrigger: {
				trigger: ".hero", // элемент, который инициирует анимацию
				start: "top top", // когда верх элемента достигнет центра viewport
				end: "+=120%", // когда низ элемента достигнет центра viewport
				scrub: true, // плавная анимация при скролле
				markers: true, // раскомментируйте для отладки (покажет маркеры)
			},
		},
	);

	gsap.fromTo(
		".hero-content",
		{
			opacity: 0,
			y: -150,
		},
		{
			opacity: 1,
			y: 0,

			scrollTrigger: {
				trigger: ".hero", // элемент, который инициирует анимацию
				start: "center", // когда верх элемента достигнет центра viewport
				end: "+=30%", // когда низ элемента достигнет центра viewport
				scrub: true, // плавная анимация при скролле
				markers: true, // раскомментируйте для отладки (покажет маркеры)
				onUpdate: (self) => {
					if (self.progress > 0.45) {
						textAnimation.play();

						gsap.to(".hero-btn-row", {
							opacity: 1,
							y: 0,
						});
					} else {
						textAnimation.reverse();

						gsap.to(".hero-btn-row", {
							opacity: 0,
							y: 30,
						});
					}
				},
				// onLeave: (instance) => {
				// 	if (instance.progress > 0.85) {

				// 	} else {

				// 	}
				// },
			},
		},
	);

	ScrollTrigger.create({
		trigger: ".hero",
		start: "clamp(top top)",
		end: "+=120%",
		scrub: 1,
		markers: true,
		onUpdate: (self) => {
			const progress = self.progress;

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

			const blurValue = gsap.utils.mapRange(0.6, 0.7, 0, 4, progress * 1.2);

			gsap.to(".hero-bg img", {
				filter: `blur(${Math.min(blurValue, 4)}px)`,
				duration: 0.6,
			});
		},
	});
});
