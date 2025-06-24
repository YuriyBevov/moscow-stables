// function initInfiniteSliders() {
// 	const columns = document.querySelectorAll(".slider-column");

// 	columns.forEach((col, index) => {
// 		const track = col.querySelector(".slider-track");
// 		if (!track || !track.children.length) return;

// 		const items = Array.from(track.children);
// 		const itemHeight = items[0].offsetHeight + 20; // высота элемента + margin
// 		const container = col.querySelector(".slider-container");
// 		const containerHeight = container.offsetHeight;

// 		let offset = 0;
// 		const direction = index === 0 ? -1 : 1; // -1 = вверх, 1 = вниз

// 		// Для движения вниз — начинаем с нижней картинки
// 		if (direction === 1) {
// 			offset = containerHeight - itemHeight;
// 		}

// 		track.style.transform = `translateY(${offset}px)`;

// 		function scrollLoop() {
// 			offset += direction * 1;
// 			track.style.transform = `translateY(${offset}px)`;

// 			// --- Логика для первой колонки (вверх) ---
// 			if (direction === -1 && offset <= -itemHeight) {
// 				const movedItem = track.firstElementChild;
// 				track.appendChild(movedItem);

// 				// Обновляем offset
// 				offset += itemHeight;

// 				// Обновляем позицию без анимации
// 				track.style.transform = `translateY(${offset}px)`;
// 			}

// 			// --- Логика для второй колонки (вниз) ---
// 			if (direction === 1 && offset >= itemHeight) {
// 				const movedItem = track.lastElementChild;
// 				track.prepend(movedItem);

// 				// Обновляем offset
// 				offset -= itemHeight;

// 				// Обновляем позицию без анимации
// 				track.style.transform = `translateY(${offset}px)`;
// 			}

// 			requestAnimationFrame(scrollLoop);
// 		}

// 		requestAnimationFrame(scrollLoop);
// 	});
// }

// // Инициализация
// initInfiniteSliders();

// // Перезапуск при изменении размера экрана
// window.addEventListener("resize", initInfiniteSliders);
