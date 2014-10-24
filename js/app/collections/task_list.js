/*
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.t6@gmail.com>
 * @date: June 20, 2012
 * @file: TASK_LIST.JS
 * @usage: A collection of Task models
*/

define([
	'jquery',
	'underscore',
	'backbone',
	'app/models/task_model'
	], function($, _, Backbone, TaskModel) {
	
	var TaskList = Backbone.Collection.extend({
		
		model: TaskModel,
		
		url: 'php/api/todos',
		// localStorage: new LocalStorage('anjiTodoApp'),
		
		initialize: function() {
			// this.on('remove', this.removeTask);
		}
	});
	
	return TaskList;
})