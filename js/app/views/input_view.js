/*
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.t6@gmail.com>
 * @date: June 20, 2012
 * @file: INPUT_VIEW.JS
 * @usage: View for the text input
*/

define([
	'jquery',
	'underscore',
	'backbone',
	'app/models/task_model',
	'app/collections/task_list',
	'app/views/task_list_view'
	], function($, _, Backbone, TaskModel, TaskList, TaskListView) {

	var InputView = Backbone.View.extend({

		el: 'div#task_entry_container',

		events: {
			'keyup input[type="text"]': 'addNewTaskToCollection',
			'click a.remove_all': 'removeAllTasks'
		},

		initialize: function() {
			var self = this;
			this.taskList = new TaskList();
			this.taskListView = new TaskListView({collection: this.taskList});
			this.taskList.fetch({
				success: function (collection, response, options) {
					var testModel =  collection.get(1);
					console.log('testModel: ');
					console.log(testModel);
					testModel.set({
						'anji': 'new message'
					});

					console.log('after: ');
					console.log(testModel);
					testModel.save();
				}
			});
		},

		addNewTaskToCollection: function(e) {
			
			var keyCode = parseInt(e.which, 10);
			
			if (keyCode === 13) {
				
				if (this.trim(this.$('input').val())) {
					
					var newTaskId = this.getNewTaskId();
					var newTask = new TaskModel({
						'description': this.$('input').val(),
						'status': 0
					});
					
					this.taskList.create(newTask, {
						success: function(model, response) {
							console.log("model: " + JSON.stringify(model));
							console.log("response: " + JSON.stringify(response));
						}
					});
				}
				
				this.$('input').val(''); // clear input box
			}
		},
		
		trim: function(s) {
			return s.replace(/^\s+|\s+$/g, '');
		},
		
		getNewTaskId: function() {
			
			var taskId = 1;
			var length = this.taskList.length;
			
			if (length > 0) {
				taskId = this.taskList.last().get('id') + 1;
			}
			
			return taskId;
		},

		removeAllTasks: function() {
			this.taskListView.removeAllTasks();
		}
	});
	
	return InputView;
});