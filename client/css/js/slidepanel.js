$(function () {
    Slidepanel = {
        options: {
            orientation: 'right',
            mode: 'overlay',
            static: true
        },
        $panel: '',
        $body: '',
        $body_position: '',
    }

    Slidepanel.init = function () {

        var base = this;

        if ($('#slidepanel').length == 0) {
            var panel_html = '<div id="slidepanel" class="cb_slide_panel"><div class="wrapper"><a href="#" class="close">Close</a><div class="inner"><div class="wrapper"></div></div></div></div>';
            $(panel_html).hide().appendTo($('body'));
        }

        this.$panel = $('#slidepanel');
        this.$body = $('body');
        this.$body_position = this.$body.css('position');

        //hide the panel and set orientation class for display
        this.$panel.hide().addClass('panel_' + this.options.orientation);

        //set current trigger link to false for the current panel
        this.$panel.data('slidepanel-current', false);
        this.$panel.data('slidepanel-loaded', false);

        //reset any defined a positions
        this.$panel.css('left', '').css('right', '').css('top', '').css('bottom', '');

        //set a default left value for top and bottom orientations
        //and set the starting position based on element height
        if (this.options.orientation == 'top' || this.options.orientation == 'bottom') {
            var options = {};
            options['left'] = 0;
            options[this.options.orientation] = -this.$panel.height();
            this.$panel.css(options);
        }

        //listen for a click on the close buttons for this panel
        $('.close', this.$panel).click(function (e) {
            e.preventDefault();
            base.collapse();
        });

    };

    Slidepanel.expand = function () {

        console.log("Slidepanel.expand");
        console.log(this);
        var base = this;

        //set a default top value for left and right orientations
        //and set the starting position based on element width
        if (this.options.orientation == 'left' || this.options.orientation == 'right') {
            var options = {};
            options['top'] = 0;
            //options['top'] = $("#main").offset().top;
            //options['height'] = $("#main").outerHeight();
            options[this.options.orientation] = -this.$panel.width();
            this.$panel.css(options);
        }

        var panel_options = {};
        var body_options = {};
        panel_options.visible = 'show';
        panel_options[this.options.orientation] = 0;
        body_options[this.options.orientation] = (this.options.orientation == 'top' || this.options.orientation == 'bottom') ? this.$panel.height() : this.$panel.width();

        //if the animation mode is set to push, we move the body in relation to the panel
        //else the panel is overlayed on top of the body
        if (this.options.mode == 'push') {
            //animate the body position in relation to the panel dimensions
            this.$body.css('position', 'absolute').animate(body_options, 250);
        }

        //animate the panel into view
        this.$panel.addClass('loading').animate(panel_options, 250, function () {
            //show the panel's close button
            $('.close', base.$panel).fadeIn(250);
        });
    };

    Slidepanel.collapse = function () {
        console.log("Slidepanel.collapse");

        //hide the close button for this panel
        $('.close', this.$panel).hide();

        //set the css properties to animatate
        var panel_options = {};
        var body_options = {};
        panel_options.visible = 'hide';
        panel_options[this.options.orientation] = -(this.$panel.width() + 40);
        body_options[this.options.orientation] = 0;

        //if the animation mode is push, move the document body back to it's original position
        if (this.options.mode == 'push') {
            this.$body.css('position', this.$body_position).animate(body_options, 250);
        }
        //animate the panel out of view
        this.$panel.animate(panel_options, 250).data('slidepanel-current', false);
    };


});