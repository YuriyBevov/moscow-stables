import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const wrapper = document.querySelector(".gallery-preview-wrapper");

gsap.to(wrapper, {
	width: () => window.innerWidth,
	height: () => window.innerWidth,
	borderRadius: 0,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",

	ease: "none",
	scrollTrigger: {
		trigger: ".gallery-preview",
		start: "top center", // запускаем, когда верх секции в центре экрана
		end: () => `+=${window.innerHeight / 3}`, // длина анимации
		scrub: true,
		pin: true, // фиксируем блок
		pinSpacing: true,
		invalidateOnRefresh: true,
		markers: true,
	},
});
