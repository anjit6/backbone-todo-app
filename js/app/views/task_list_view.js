/*
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.t6@gmail.com>
 * @date: June 20, 2012
 * @file: TASK_LIST_VIEW.JS
 * @usage: View for TaskList (collection)
*/

define([
	'jquery',
	'jqueryui',
	'underscore',
	'backbone',
	'app/views/task_view'
	], function($, jQueryUI, _, Backbone, TaskView) {

	var TaskListView = Backbone.View.extend({
		el: 'div#tasks_list',
		initialize: function() {
			this.collection.on('add', this.addOneTask, this);
			this.collection.on('reset', this.addAllTasks, this);
			this.$el.sortable();
			this.$el.disableSelection();
		},
		addOneTask: function(taskModel) {
			var taskView = new TaskView({model: taskModel});
			this.$el.append(taskView.render().el);
		},
		addAllTasks: function() {
			this.$el.empty();
			this.collection.forEach(this.addOneTask, this);
		},
		render: function() {
			this.addAllTasks();
		},
		removeAllTasks: function() {
			var len = this.collection.length;
			for (var i = len - 1; i >= 0; i--) {
				this.collection.at(i).destroy(); // dispatch destroy event which dispatches backbone syn event
			}
			this.render();
		}
	});
	
	return TaskListView;
});