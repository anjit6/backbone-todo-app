/*
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.t6@gmail.com>
 * @date: June 20, 2012
 * @file: TASK_VIEW.JS
 * @usage: Task view
*/

define([
	'jquery',
	'underscore',
	'backbone',
	'text!app/templates/task.html'
	], function($, _, Backbone, taskTemplate) {
	
	var TaskView = Backbone.View.extend({
		tagName: 'div',
		className: 'task',
		events: {
			"click input[type='checkbox']": "toggleStatus",
			"dblclick div.view": "toggleView",
			"keyup input.editing": "checkForUpdate",
			"click a.delete": "deleteTask",
			"blur input.editing": "updateTask"
		},
		template: _.template(taskTemplate),
		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},
		render: function() {
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
			this.addCompleteTaskClass();
			this.$el.fadeIn('slow');
			return this;
		},
		toggleView: function() {
			this.$('div.view').toggle();
			this.$('div.edit').toggle();
			this.$('input.editing').focus();
		},
		checkForUpdate: function(e) {
			var keyCode = e.which;
			if (keyCode === 13) {
				this.updateTask();
			}
		},
		updateTask: function() {
			this.toggleView();
			this.model.updateTask(this.$('input.editing').val());
		},
		remove: function() {
			this.$el.fadeOut();
		},
		toggleStatus: function() {
			this.model.toggleStatus();
			this.addCompleteTaskClass();
		},
		deleteTask: function(e) {
			this.model.destroy();
		},
		addCompleteTaskClass: function() {
			if (this.model.get('status') === 1) {
				this.$el.addClass('complete_task');
			}
			else {
				this.$el.removeClass('complete_task');
			}
		}
	});
	
	return TaskView;
});