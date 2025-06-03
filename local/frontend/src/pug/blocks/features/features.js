// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // Создаем пунктирную линию
// const dottedLine = document.createElement("div");
// dottedLine.className = "dotted-line";
// document.body.appendChild(dottedLine);

// // Начальные параметры
// const initialHeight = window.innerHeight * 0.1; // 10% от высоты экрана
// let isHorizontal = false;
// let horizontalDirection = Math.random() > 0.5 ? 1 : -1;
// const maxHorizontalOffset = 300;
// const bottomThreshold = 0.2; // 20% от высоты экрана

// // Установка начальных стилей
// gsap.set(dottedLine, {
// 	position: "fixed",
// 	top: "0",
// 	left: "50%",
// 	width: "1px",
// 	height: `${initialHeight}px`,
// 	background:
// 		"repeating-linear-gradient(to bottom, #000, #000 10px, transparent 10px, transparent 20px)",
// 	transform: "translateX(-50%)",
// 	zIndex: 1000,
// 	pointerEvents: "none",
// 	opacity: 0,
// });

// // Плавное появление
// gsap.to(dottedLine, { opacity: 1, duration: 1 });

// // Основная анимация
// const updateLine = () => {
// 	const scrollY = window.scrollY;
// 	const docHeight = document.body.scrollHeight;
// 	const viewportHeight = window.innerHeight;
// 	const scrollBottom = scrollY + viewportHeight;
// 	const distanceToBottom = docHeight - scrollBottom;

// 	// Проверяем приближение к низу
// 	const nearBottom = distanceToBottom < viewportHeight * bottomThreshold;

// 	if (nearBottom && !isHorizontal) {
// 		// Начинаем горизонтальное движение
// 		isHorizontal = true;
// 		horizontalDirection = Math.random() > 0.5 ? 1 : -1;

// 		gsap.to(dottedLine, {
// 			x: horizontalDirection * maxHorizontalOffset,
// 			duration: 1,
// 			ease: "power2.out",
// 		});
// 	} else if (!nearBottom && isHorizontal) {
// 		// Возвращаемся в центр
// 		isHorizontal = false;
// 		gsap.to(dottedLine, {
// 			x: 0,
// 			duration: 0.8,
// 			ease: "power2.inOut",
// 		});
// 	}

// 	// Всегда обновляем высоту (10% от вьюпорта)
// 	gsap.set(dottedLine, {
// 		height: `${initialHeight}px`,
// 		y: 0, // Фиксируем сверху
// 	});

// 	requestAnimationFrame(updateLine);
// };

// // Запускаем анимацию
// updateLine();

// // Обработчик ресайза
// window.addEventListener("resize", () => {
// 	initialHeight = window.innerHeight * 0.1;
// 	gsap.set(dottedLine, { height: `${initialHeight}px` });
// 	ScrollTrigger.refresh();
// });
