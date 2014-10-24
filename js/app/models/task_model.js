/*
 * @author: Anjaneyulu Reddy BEERAVALLI <anji.t6@gmail.com>
 * @date: June 20, 2012
 * @file: TASK_MODEL.JS
 * @usage: Task model with three properties: id, status, description
*/

define(['underscore', 'backbone'], function(_, Backbone) {
	
	var TaskModel = Backbone.Model.extend({
		urlRoot: 'php/api/todos',
		toggleStatus: function() {
			if (this.get('status') === 1) {
				this.set({status: 0});
			}
			else {
				this.set({status: 1});
			}
			this.save();
		},
		updateTask: function(des) {
			this.set({description: des});
			this.save();
		}
	});
	
	return TaskModel;
});
