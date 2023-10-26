/* ===================================
--------------------------------------
  SolMusic HTML Template
  Version: 1.0
--------------------------------------
======================================*/


'use strict';

$(window).on('load', function () {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

	if ($('.playlist-area').length > 0) {
		var containerEl = document.querySelector('.playlist-area');
		var mixer = mixitup(containerEl);
	}

});

(function ($) {
	/*------------------
		Navigation
	--------------------*/
	$(".main-menu").slicknav({
		appendTo: '.header-section',
		allowParentLinks: true,
		closedSymbol: '<i class="fa fa-angle-right"></i>',
		openedSymbol: '<i class="fa fa-angle-down"></i>'
	});

	$('.slicknav_nav').prepend('<li class="header-right-warp"></li>');
	$('.header-right').clone().prependTo('.slicknav_nav > .header-right-warp');

	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function () {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	$('.hero-slider').owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		mouseDrag: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items: 1,
		autoplay: true
	});

})(jQuery);

const Questions = [{
		q: "Вы чувствуете накопление напряжения и раздражение?",
		a: [{
				text: "Да",
				isCorrect: true
			},
			{
				text: "Нет",
				isCorrect: false
			}
		]

	},
	{
		q: "Вы испытываете трудности в решении повседневных проблем?",
		a: [{
				text: "Да",
				isCorrect: true
			},
			{
				text: "Нет",
				isCorrect: false
			}
		]

	},
	{
		q: "У вас появляются физические симптомы стресса (головная боль, боли в желудке, бессонница и т.д.)?",
		a: [{
				text: "Да",
				isCorrect: true
			},
			{
				text: "Нет",
				isCorrect: false
			}
		]

	},
	{
		q: "Изменения в вашей жизни вызывают у вас стресс?",
		a: [{
				text: "Да",
				isCorrect: true
			},
			{
				text: "Нет",
				isCorrect: false
			}
		]

	},
	{
		q: "Вы часто сомневаетесь в своих способностях и чувствуете неуверенность?",
		a: [{
				text: "Да",
				isCorrect: true
			},
			{
				text: "Нет",
				isCorrect: false
			}
		]

	},
	{
		q: "Вы хорошо справляетесь с эмоциональным давлением и конфликтами?",
		a: [{
				text: "Да",
				isCorrect: true
			},
			{
				text: "Нет",
				isCorrect: false
			}
		]

	},
	{
		q: "У вас есть стратегии для снятия стресса?",
		a: [{
				text: "Да",
				isCorrect: true
			},
			{
				text: "Нет",
				isCorrect: false
			}
		]

	},
	{
		q: "У вас возникают проблемы со сном?",
		a: [{
				text: "Да",
				isCorrect: true
			},
			{
				text: "Нет",
				isCorrect: false
			}
		]

	},
	{
		q: "Вы удовлетворены своей работой или учебой?",
		a: [{
				text: "Да",
				isCorrect: true
			},
			{
				text: "Нет",
				isCorrect: false
			}
		]

	},
	{
		q: "Вы проводите свободное время активно и с наслаждением?",
		a: [{
				text: "Да",
				isCorrect: true
			},
			{
				text: "Нет",
				isCorrect: false
			}
		]

	},
]

let currQuestion = 0
let score = 0

function loadQues() {
	const question = document.getElementById("ques")
	const opt = document.getElementById("opt")

	question.textContent = Questions[currQuestion].q;
	opt.innerHTML = ""

	for (let i = 0; i < Questions[currQuestion].a.length; i++) {
		const choicesdiv = document.createElement("div");
		const choice = document.createElement("input");
		const choiceLabel = document.createElement("label");

		choice.type = "radio";
		choice.name = "answer";
		choice.value = i;

		choiceLabel.textContent = Questions[currQuestion].a[i].text;

		choicesdiv.appendChild(choice);
		choicesdiv.appendChild(choiceLabel);
		opt.appendChild(choicesdiv);
	}
}

loadQues();

function loadScore() {
	const totalScore = document.getElementById("score")
	if(score <= 3) {
		totalScore.textContent = "У вас отсутствует стресс"
	} else if (score >= 4 && score <= 6) {
		totalScore.textContent = "У вас умеренный уровень стресса"
	} else if (score == 7 || score == 8) {
		totalScore.textContent = "У вас высокий уровень стресса"
	} else if (score == 9 || score == 10) {
		totalScore.textContent = "У вас критический уровень стресса"
	}
	// totalScore.textContent = `You scored ${score} out of ${Questions.length}`
}


function nextQuestion() {
	if (currQuestion < Questions.length - 1) {
		currQuestion++;
		loadQues();
	} else {
		document.getElementById("opt").remove()
		document.getElementById("ques").remove()
		document.getElementById("btn").remove()
		loadScore();
	}
}

function checkAns() {
	const selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);

	if (Questions[currQuestion].a[selectedAns].isCorrect) {
		score++;
		console.log("Correct")
		nextQuestion();
	} else {
		nextQuestion();
	}
}