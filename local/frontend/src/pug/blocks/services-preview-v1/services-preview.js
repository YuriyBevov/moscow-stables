import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function animateCards() {
	const items = document.querySelectorAll(".services-preview__grid-item");

	items.forEach((item) => {
		const card = item.querySelector(".services-preview-card");
		const title = item.querySelector(".services-preview-card__title");
		const image = card.querySelector("img");

		const splitTitle = new SplitText(title, {
			type: "chars,words",
			charsClass: "gsap-split-char",
			wordsClass: "gsap-split-word",
		});

		gsap.set(splitTitle.chars, { color: "var(--primary-color)" });
		gsap.set(card, { y: 100, autoAlpha: 0 });

		gsap.fromTo(
			card,
			{ y: 200, autoAlpha: 0 },
			{
				y: 0,
				autoAlpha: 1,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: item,
					start: "top bottom",
					toggleActions: "play none none reverse",
				},
			},
		);

		if (!card || !image) return;

		const state = {
			textTimeline: null,
			isHovered: false,
			isAnimated: false,
			hoverTimeout: null,
		};

		const animateImage = (blur, scale, duration = 0.8) => {
			gsap.to(image, {
				filter: `blur(${blur}px)`,
				scale,
				duration,
				ease: "power2.out",
			});
		};

		const animateText = (color, duration, delay, from) => {
			if (state.textTimeline) state.textTimeline.kill();

			state.textTimeline = gsap.timeline();
			state.textTimeline.to(splitTitle.chars, {
				color,
				duration,
				delay,
				stagger: { amount: 0.25, from },
				ease: duration > 0.1 ? "power2.inOut" : "power2.out",
			});
		};

		const handleMouseEnter = () => {
			state.isHovered = true;

			state.hoverTimeout = setTimeout(() => {
				if (state.isHovered && !state.isAnimated) {
					state.isAnimated = true;
					animateImage(2, 1.05);
					animateText("var(--white-color)", 0.7, 0.4, "center");
				}
			}, 150);
		};

		const handleMouseLeave = () => {
			state.isHovered = false;

			if (state.hoverTimeout) {
				clearTimeout(state.hoverTimeout);
				state.hoverTimeout = null;
			}

			if (state.isAnimated) {
				state.isAnimated = false;
				animateImage(0, 1, 0.4);
				animateText("var(--primary-color)", 0.08, 0.2, "center");
			}
		};

		card.addEventListener("mouseenter", handleMouseEnter);
		card.addEventListener("mouseleave", handleMouseLeave);
	});
}

const initializeAfterFontsLoad = () => {
	if (document.fonts && document.fonts.ready) {
		document.fonts.ready.then(animateCards);
	} else {
		window.addEventListener("load", () => {
			setTimeout(animateCards, 100);
		});
	}
};

document.addEventListener("DOMContentLoaded", initializeAfterFontsLoad);
