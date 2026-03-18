/*!
    Title: Dev Portfolio Template
    Version: 1.2.2
    Last Change: 03/25/2020
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Show current year
    $("#current-year").text(new Date().getFullYear());

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 5);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // News section: show only first 5 items, toggle the rest
    (function() {
        var $newsCol = $('#news .col-md-10');
        var $items = $newsCol.children('p');
        var $spacers = $newsCol.children('span');
        var limit = 5;

        if ($items.length > limit) {
            $items.each(function(i) { if (i >= limit) $(this).hide(); });
            $spacers.each(function(i) { if (i >= limit) $(this).hide(); });

            var $toggle = $('<a href="#" id="toggle-news" class="no-scroll toggle-section"><i class="fa fa-chevron-down"></i>Show more</a>');
            $newsCol.append($toggle);

            $toggle.click(function(e) {
                e.preventDefault();
                var hidden = $items.eq(limit).is(':hidden');
                $items.each(function(i) { if (i >= limit) $(this).toggle(hidden); });
                $spacers.each(function(i) { if (i >= limit) $(this).toggle(hidden); });
                $(this).html(hidden ? '<i class="fa fa-chevron-up"></i>Show less' : '<i class="fa fa-chevron-down"></i>Show more');
            });
        }
    })();

    // Generic show more/less for block sections
    function initToggle(sectionId, blockClass, limit) {
        var $section = $(sectionId);
        var $blocks = $section.children('.' + blockClass);
        if ($blocks.length <= limit) return;

        $blocks.each(function(i) { if (i >= limit) $(this).hide(); });
        var $toggle = $('<a href="#" class="no-scroll toggle-section"><i class="fa fa-chevron-down"></i>Show more</a>');
        $section.append($toggle);

        $toggle.click(function(e) {
            e.preventDefault();
            var hidden = $blocks.eq(limit).is(':hidden');
            $blocks.each(function(i) { if (i >= limit) $(this).toggle(hidden); });
            $(this).html(hidden ? '<i class="fa fa-chevron-up"></i>Show less' : '<i class="fa fa-chevron-down"></i>Show more');
        });
    }

    initToggle('#publication', 'publication-block', 5);
    initToggle('#talks', 'talks-block', 5);

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

})(jQuery);
