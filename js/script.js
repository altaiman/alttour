$(function(){
	$('.slider').each(function(i, slider) {
		var slides = $(slider).find('.slider__item').length;

		if (slides > 1) {
			$(slider).flickity({
				prevNextButtons: false,
				wrapAround: true,
				contain: true,
				autoPlay: 6000,
				pauseAutoPlayOnHover: false,
				pauseAutoPlayOnFocus: false
			});
		};
	});


	function reviewsSlider() {
		var slider = $('.reviews__list').flickity({
			wrapAround: true,
			contain: true,
			draggable: false,
			// freeScroll: true,
			// prevNextButtons: false,
			pageDots: false,
			centerMode: true
		});

		var flkty = $(slider).data('flickity');

		function focus() {
			var current = flkty.selectedElements[0],
		 		prev = $(current).prev().get(0),
		 		next = $(current).next().get(0);

		 	if (!prev) {
		 		prev = $('.reviews__item').last()
		 	}

		 	if (!next) {
		 		next = $('.reviews__item').first();
		 	}

		 	var slides = [current, next, prev];

		 	$(slides).each(function(i, el) {
		 		$(el).addClass('focus');
		 	});
		}

		var step = 100 / flkty.cells.length;

		$('.reviews__sli').slider({
			max: 100 - step,
			slide: function() {
				var left = Math.round($(this).find('span').first().css('left').split('px')[0]) / $(this).width() * 100;
				flkty.select(Math.floor(left/step));
			}
		});

		focus();

		$(slider).on( 'select.flickity', function() {
			var val = step * flkty.selectedIndex;

			$('.reviews__sli').slider('value', val);
			$('.reviews__item.focus').removeClass('focus');
			focus();
		});
	}

	if ($('.reviews__list').get(0)) {
		reviewsSlider();
	}
	
	function countries() {
		function image(item) {
			var index = $(item).index(), 
				img = $('.countries__image img')[index];

			// $('.countries__image').empty().append($(img).clone());
			// $('.countries__image').css('background-image', 'url('+img+')');
			
			$(img).addClass('show');
			$(item).addClass('focus');
		}

		image($('.countries__item.focus'));
		

		$('.countries__item').hover(function() {
			$('.countries__item.focus').removeClass('focus');
			$('.countries__image img').removeClass('show');
			image(this);
		})
	}

	countries();

	function initContacts() {
        ymaps.ready(init);
        var map, 
            placemark,
            coordsArr = [];

        $('.map__points li').each(function(i, coords) {
        	coordsArr.push($(coords).data('coords').split(','));
        })

        var active = $('.map__points li.active').first().data('coords').split(',');

        function init(){ 
            map = new ymaps.Map("contacts", {
                center: active,
                zoom: 7
            }); 

            $(coordsArr).each(function(i, coords) {
            	placemark = new ymaps.Placemark(coords, {});
	            
	            map.geoObjects.add(placemark);
            })
        }

        $('.map__points li').on('click', function() {
			$(this).parent().find('.active').removeClass('active');

			$(this).addClass('active');
			map.setCenter($(this).data('coords').split(','))
		});
	}

	if ($('#contacts').get(0)) {
		initContacts();
	}

	$('.gallery__slider').flickity({
		cellAlign: 'left',
		pageDots: false,
		wrapAround: true,
		contain: true,
		draggable: false,
		arrowShape: 'M 0 36.2313C 0 34.9059 0.464845 33.7794 1.39453 32.8517C 2.32421 31.9239 3.45312 31.4601 4.78124 31.4601L 50.9999 31.4601L 50.9999 4.82089C 50.9999 2.70036 51.996 1.2425 53.9882 0.447299C 55.9803 -0.3479 57.6405 -0.0828318 58.9686 1.2425L 98.8123 40.6049C 99.6091 41.6651 100.008 42.8579 100.008 44.1832C 100.008 45.5086 99.6091 46.7014 98.8123 47.7616L 59.367 86.7264C 57.7733 88.3168 55.9803 88.7144 53.9882 87.9192C 51.996 87.124 50.9999 85.6661 50.9999 83.5456L 50.9999 56.9064L 4.78124 56.9064C 3.45312 56.9064 2.32421 56.4426 1.39453 55.5148C 0.464845 54.5871 0 53.4606 0 52.1352L 0 36.2313Z'
	})

	var star = $('.stars_edit').attr('data-stars');

	$('.stars_edit').hover(function() {
		$('.stars_edit').mousemove(function(e) {
			if (e.target.tagName !== 'I') return;
			
			var newStar = $(this).find(e.target).index()+1;

			$(this).attr('data-stars', newStar);

			$('.stars_edit').on('click', function(e) {
				star = newStar;	
			});
		});
	}, function() {
		$(this).attr('data-stars', star)
	})




	if ($('#dropzone').get(0)) {
		var dropzone = new Dropzone('#dropzone', {
			url: '/upload',
			maxFiles:10,
			acceptedFiles: 'image/*',
			addRemoveLinks: true,
			dictRemoveFile: 'Удалить файл',
			init: function() {
	      		this.on("maxfilesexceeded", function(file) {
	            this.removeAllFiles();
	            this.addFile(file);
			      });
			}   
		});
	}

	function certificates() {
		$('.certificates__item').each(function(i, item) {
			var img = $(item).find('img').hide().attr('src');

			$(item).css('background-image', 'url('+img+')');
		});

		var slider = $('.certificates__list').flickity({
			// groupCells: 5,
			initialIndex: 2,
			pageDots: false,
			contain: true,
			arrowShape: { 
			  x0: 10,
			  x1: 60, y1: 50,
			  x2: 65, y2: 45,
			  x3: 20
			}
		})

		var flkty = $(slider).data('flickity');	

		function hideButtons() {
			if (flkty.selectedIndex <= 2) {
				$('.certificates .flickity-prev-next-button.previous').hide();
			} else if (flkty.selectedIndex >= flkty.cells.length-3) {
				$('.certificates .flickity-prev-next-button.next').hide();
			} else {
				$('.certificates .flickity-prev-next-button').show();
			}
		}	

		hideButtons();
		flkty.on('select', hideButtons);
	}

	if ($('.certificates__list').get(0)) {
		certificates();
	}

	$('select').niceSelect();

	$('input[type="date"]').on('click', function(e) {
		e.preventDefault();
	})

	$('input[type="datepicker"]').datepicker();
	
	// $('[data-modal]').on('click', function(e) {
	// 	e.preventDefault();
	// 	var modal = $(this).data('modal');

	// 	$('.modal[data-modal="'+modal+'"]').bPopup({
	// 		opacity: 0
	// 	});
	// })

	function teamModal() {
		var bPopup;

		$('li[data-modal="team"').hover(function() {
			var modal = $(this).data('modal');

			bPopup = $('.modal[data-modal="team"]').bPopup({
				opacity: 0,
				positionStyle: 'fixed'
			});
		}, function() {
			bPopup.close();
		});
	}

	// teamModal();

	$('.team__item').hover(function() {
		var reference = $(this);
		var popper = document.querySelector('.modal[data-modal="team"]');
		var anotherPopper = new Popper(
		    reference,
		    popper,
		    {
		        placement: 'bottom'
		    }
		);
		$(popper).fadeIn(200);
	}, function() {
		$('.modal[data-modal="team"]').hide();
	});

	$('[data-zoom]').on('click', function() {
		var img = $(this).data('zoom'),
			current = this,
			prev = $(current).prev().get(0),
			next = $(current).next().get(0);

		$('.zoom__ctr').show();

		if (!prev) {
			$('.zoom__ctr_prev').hide()
		} else if (!next) {
			$('.zoom__ctr_next').hide();
		}

		$('.zoom__content').empty().append('<img src="'+img+'"/>');

		setTimeout(function() {
			$('.zoom').bPopup({
				opacity: 0
			});
		}, 500)

		$('.zoom__ctr').off();

		$('.zoom__ctr').on('click', function() {
			var direction = +$(this).hasClass('zoom__ctr_next');

			switch (direction) {
				case 0:
					$(prev).trigger('click');
					break;
				case 1:
					$(next).trigger('click');
					break;
			}
		});
	})

	$('.form__submit').on('click', function(e) {
		e.preventDefault();
		var form = $(this).closest('form'),
			stars = $(form).find('.stars').get(0);

		$(form).find('.form__field_error').removeClass('form__field_error');

		$(form).find('.form__field_req').each(function(i, field) {
			var val = $(field).find('input, textarea, select').val();


			if (!val) {
				$(this).addClass('form__field_error');
			}
		})

		if (stars) {
			console.log($(stars).attr('data-stars'))
			$(stars).removeClass('stars_error');
			if ($(stars).attr('data-stars') == 0) {
				$(stars).addClass('stars_error');
			}
		}
	});
});