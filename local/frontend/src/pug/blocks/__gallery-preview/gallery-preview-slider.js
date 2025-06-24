import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

/**
 * Класс для управления бесконечными слайдерами галереи
 */
class InfiniteGallerySlider {
	constructor(options = {}) {
		this.timelines = [];
		this.currentSpeed = options.speed || 0.4; // Медленная скорость по умолчанию
		this.baseDuration = options.duration || 40; // Базовая продолжительность анимации

		this.init();
	}

	init() {
		const columns = document.querySelectorAll(".gallery-column");

		columns.forEach((column, index) => {
			this.createSliderAnimation(column, index);
		});
	}

	createSliderAnimation(column, columnIndex) {
		const sliderContainer = column.querySelector(".slider-container");
		const slides = sliderContainer.querySelectorAll(".slide-item");
		const slideHeight = slides[0].offsetHeight + 5; // высота + gap
		const slidesCount = slides.length / 2; // Половина, так как у нас дубликаты
		const totalHeight = slideHeight * slidesCount;

		// Определяем направление: четные колонки (2, 4) вверх, нечетные (1, 3) вниз
		const isEvenColumn = (columnIndex + 1) % 2 === 0;
		const direction = isEvenColumn ? -1 : 1;

		// Устанавливаем начальную позицию
		const startY = isEvenColumn ? 0 : -totalHeight;
		gsap.set(sliderContainer, { y: startY });

		// Создаем бесконечную анимацию
		const timeline = gsap.timeline({
			repeat: -1,
			ease: "none",
		});

		timeline.to(sliderContainer, {
			y: startY + direction * totalHeight,
			duration: this.baseDuration,
			ease: "none",
			onRepeat: () => {
				gsap.set(sliderContainer, { y: startY });
			},
		});

		// Устанавливаем скорость
		timeline.timeScale(this.currentSpeed);

		this.timelines.push(timeline);
	}

	/**
	 * Изменяет скорость всех слайдеров
	 * @param {number} speed - Новая скорость (0.1 - очень медленно, 2 - быстро)
	 */
	setSpeed(speed) {
		this.currentSpeed = speed;
		this.timelines.forEach((tl) => {
			tl.timeScale(speed);
		});
	}

	/**
	 * Ставит анимацию на паузу или возобновляет
	 */
	togglePause() {
		this.timelines.forEach((tl) => {
			if (tl.paused()) {
				tl.play();
			} else {
				tl.pause();
			}
		});
	}

	/**
	 * Полностью останавливает анимацию
	 */
	stop() {
		this.timelines.forEach((tl) => {
			tl.kill();
		});
		this.timelines = [];
	}

	/**
	 * Перезапускает анимацию
	 */
	restart() {
		this.stop();
		this.init();
	}
}

// Глобальная переменная для управления слайдером
let gallerySlider;

// Инициализация после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
	// Создаем экземпляр слайдера
	gallerySlider = new InfiniteGallerySlider({
		speed: 0.4, // Медленная скорость
		duration: 40, // Длительность одного цикла
	});

	// Эффект появления секции
	gsap.fromTo(
		"#gallerySection",
		{
			opacity: 0,
			scale: 0.98,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 1.5,
			ease: "power2.out",
			delay: 0.3,
		},
	);
});
