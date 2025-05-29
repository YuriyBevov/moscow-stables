import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
	wrapper: "#smooth-wrapper",
	content: "#smooth-content",
	smooth: 1.5,
	effects: true,
	normalizeScroll: true,
	ignoreMobileResize: true,
	effects: true,
	preventDefault: true,
	speed: 0.75,
});
