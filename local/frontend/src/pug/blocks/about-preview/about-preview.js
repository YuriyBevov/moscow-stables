import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// const aboutImages = gsap.utils.toArray(".about__grid-item img");

// // Устанавливаем начальное состояние (если нужно)
// // gsap.set(aboutImages, { opacity: 0.4 });

// aboutImages.forEach((img) => {
// 	// Анимация появления (снизу до центра)
// });

// gsap.to(".about", {
// 	opacity: 1,
// 	scrollTrigger: {
// 		trigger: ".about",
// 		start: "top center",
// 		end: "center center",
// 		scrub: true,
// 	},
// });
