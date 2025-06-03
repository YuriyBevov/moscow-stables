// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // 1. Создаем прогрессбар
// const progressBar = document.createElement("div");
// progressBar.className = "progress-bar";
// document.body.appendChild(progressBar);

// // 2. Настройка стилей
// gsap.set(progressBar, {
// 	position: "fixed",
// 	top: 0,
// 	left: 0,
// 	width: "6px",
// 	height: "0%",
// 	background: "#ff0000",
// 	zIndex: 10000,
// });

// // 3. Корректируем высоту документа
// const adjustDocumentHeight = () => {
// 	const body = document.body;
// 	const html = document.documentElement;
// 	const height = Math.max(
// 		body.scrollHeight,
// 		body.offsetHeight,
// 		html.clientHeight,
// 		html.scrollHeight,
// 		html.offsetHeight,
// 	);
// 	document.documentElement.style.height = `${height}px`;
// };

// adjustDocumentHeight();

// // 4. Анимация прогресса
// ScrollTrigger.create({
// 	onUpdate: (self) => {
// 		console.log(self.progress);
// 		gsap.to(progressBar, {
// 			height: `${self.progress * 101}%`,
// 			duration: 0.5,
// 			ease: "power1.out",
// 		});
// 	},
// });

// // 5. Обновляем при ресайзе
// window.addEventListener("resize", () => {
// 	adjustDocumentHeight();
// 	ScrollTrigger.refresh();
// });
