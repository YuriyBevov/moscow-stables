<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
IncludeTemplateLangFile(__FILE__);
?>
<html>

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<? $APPLICATION->ShowHead(); ?>
	<title><? $APPLICATION->ShowTitle() ?></title>
	<script type="module" crossorigin src="<?= SITE_TEMPLATE_PATH . '/assets/index.js' ?>"></script>
	<!-- <link rel="stylesheet" crossorigin href="<?= SITE_TEMPLATE_PATH . '/assets/css/index.css' ?>"> -->
</head>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" bgcolor="#FFFFFF">

	<? $APPLICATION->ShowPanel() ?>

	<div id="smooth-wrapper">
		<div id="smooth-content">
			<main>
				<section class="section hero">
					<div class="hero-title">
						<img src="<?= SITE_TEMPLATE_PATH . '/assets/img/moscovia.svg' ?>" alt="Изображение" width="1920" height="1080">
						<img src="<?= SITE_TEMPLATE_PATH . '/assets/img/stables.svg' ?>" alt="Изображение" width="1920" height="1080">
					</div>
					<div class="hero-bg">
						<img src="<?= SITE_TEMPLATE_PATH . '/assets/img/hero-img.png' ?>" alt="Изображение" width="1920" height="1080" data-speed="auto">
					</div>
					<div class="hero-content">
						<h1 class="visually-hidden" style="display:none;">Moscovia Stables</h1>
						<p class="base-text hero-text">Московские конюшни представляют собой многопрофильный бизнес в сфере коневодства и конного спорта.Компания успешно сочетает традиционные методы коневодства с современными бизнес-подходами. </p>
						<p class="base-text hero-text">Московские конюшни представляют собой многопрофильный бизнес в сфере коневодства и конного спорта.Компания успешно сочетает традиционные методы коневодства с современными бизнес-подходами.</p>
						<div class="btn-row hero-btn-row">
							<button class="main-btn">
								Связаться с нами
							</button>
							<button class="main-btn --outlined">Купить сертификат</button>
						</div>
					</div>
				</section>
				<section class="features">
					<img class="features-decor-img features-decor-img--left" src="<?= SITE_TEMPLATE_PATH  . '/assets/img/decor-left.svg' ?>" alt="" width="140" height="140">
					<img class="features-decor-img features-decor-img--right" src="<?= SITE_TEMPLATE_PATH  . '/assets/img/decor-right.svg' ?>" alt="" width="140" height="140">
					<div class="features__grid">
						<div class="features__grid-item"><strong>10 </strong><span>гектаров<br>земли</span></div>
						<div class="features__grid-item"><strong>14 </strong><span>манежей</span></div>
						<div class="features__grid-item"><strong>250 </strong><span>единиц<br>инвенторя</span></div>
						<div class="features__grid-item"><strong>130 </strong><span>голов<br>лошадей</span></div>
					</div>
				</section>
				<section class="about">
					<div class="about__grid">
						<div class="about__grid-item" data-speed="1.8">
							<img src="<?= SITE_TEMPLATE_PATH . '/assets/img/about-img-3.png' ?>" alt="Параллакс картинка" width="300" height="700">
							<img src="<?= SITE_TEMPLATE_PATH . '/assets/img/about-img.png' ?>" alt="Параллакс картинка" width="300" height="700">
							<img src="<?= SITE_TEMPLATE_PATH . '/assets/img/about-img.png' ?>" alt="Параллакс картинка" width="300" height="700">
						</div>
						<div class="about__grid-item" data-speed="1.6">
							<h2 class="base-title">О нас</h2>
							<p class="base-text">Наша конюшня — это место, где живут страсть к лошадям, профессиональный спорт и душевный отдых. Мы объединяем любителей верховой езды, спортсменов и тех, кто просто хочет насладиться общением с этими удивительными животными.</p>
							<p class="base-text">С 2018 года мы создаем комфортные условия для обучения, тренировок и прогулок. Наши инструкторы — опытные наездники с педагогическим подходом, а лошади — воспитанные, здоровые и дружелюбные партнеры.</p>
							<p class="base-text">Мы верим, что верховая езда — это не просто спорт, а особый образ жизни, который дарит радость, уверенность в себе и гармонию с природой.</p>
						</div>
						<div class="about__grid-item" data-speed="1.4">
							<img src="<?= SITE_TEMPLATE_PATH . '/assets/img/about-img.png' ?>" alt="Параллакс картинка" width="300" height="700">
							<img src="<?= SITE_TEMPLATE_PATH . '/assets/img/about-img-2.png' ?>" alt="Параллакс картинка" width="300" height="700">
							<img src="<?= SITE_TEMPLATE_PATH . '/assets/img/about-img.png' ?>" alt="Параллакс картинка" width="300" height="700">
						</div>
					</div>
				</section>
				<section class="workup-section" style="height: 1000vh;">
					<div class="container"><span>секция для разработки</span></div>
				</section>
			</main>
		</div>
	</div>