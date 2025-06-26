import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger, SplitText);

function init() {
	console.log("test");
}

const initializeAfterFontsLoad = () => {
	if (document.fonts?.ready) {
		document.fonts.ready.then(init);
	} else {
		window.addEventListener("load", () => setTimeout(init, 100));
	}
};

document.addEventListener("DOMContentLoaded", initializeAfterFontsLoad);
