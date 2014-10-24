/*
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.t6@gmail.com>
 * @date: June 20, 2012
 * @file: MAIN.JS
 * @usage: Entry point for the application
*/

require.config({
	paths: {
		jquery: 'libs/jquery/jquery-1.7.2',
		jqueryui: 'libs/jquery/jquery-ui-1.8.21.custom.min',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		localstorage: 'libs/backbone/localstorage',
		text: 'libs/require/text'
	}
});

require(['jquery', 'app/views/input_view'], function($, InputView) {
	$(document).ready(function() {
		var inputView = new InputView();
	})
});