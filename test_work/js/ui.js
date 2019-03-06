var ui = {
	ShowEditor: function(task_index){
		ui.FillForm(task_index);
		$('#task_editor').show();
	},
	HideEditor: function(){
		$('#task_editor').hide();
	},
	FillForm: function(task_index){
		if (task_index === undefined){
			$('input[name="operation"]').val(-1);
			$('input[name="title"]').val('');
			$('textarea[name="descr"]').val('');
		}else{			
			let r = TaskList.getRecord(task_index);
			$('input[name="operation"]').val(task_index);
			$('input[name="title"]').val(r.title);
			$('textarea[name="descr"]').val(r.descr);
		}
	},
	SaveData: function(){
		ui.HideEditor();
		
		var i = parseInt($('input[name="operation"]').val());
		if (i == -1) {
			let d = {
				title:		$('input[name="title"]').val(),
				descr:		$('textarea[name="descr"]').val(),
				created:	new Date(),
				done:		null
			};
			TaskList.push(d);
		} else {
			var editableData = {
				title:		$('input[name="title"]').val(),
				descr:		$('textarea[name="descr"]').val()
			};
			
			if (!TaskList.updateRecord(editableData, i)) alert(app.error.lost_record); 
		}
		
		app.SaveTasks();		
		ui.ShowTaskList();
	},
	ShowTaskList: function(){
		ui.ClearTaskList();
		var render_arr = app.GetRendererTask();
		for (var item in render_arr){
			ui.renderTaskItem(render_arr[item], item);
		}
	},
	ClearAll: function(){
		if (confirm('Clear all data?')){
			TaskList.clear();
			app.SaveTasks();		
			ui.ClearTaskList();
		}
	},
	ClearTaskList: function(){
		$('#task_container').html('');
	},
	deleteTask: function(){
		if (!confirm('Clear this data?')) return;
		var id = ui.getId(this);
		if (TaskList.delete(id)){
			$('#task_container').remove('div[taskId='+id+']');
			app.SaveTasks();
			ui.ShowTaskList();
		}				
		else  alert(app.error.lost_record);
	},
	doneTask: function(){		
		var id = ui.getId(this);
		if (TaskList.done(id)){
			app.SaveTasks();
			ui.ShowTaskList();
		}			
		else  alert(app.error.lost_record);
	},
	editTask: function(){		
		var id = ui.getId(this);
		if (TaskList.getIndex(id) !== false){
			ui.ShowEditor(id);
		}			
		else  alert(app.error.lost_record);
	},
	getId: function(el){
		return parseInt($(el).parents().parents().attr('taskId'));
	},
	replace: function(id, item){
		$('div[taskId=' + id + ']').replaceWith(ui.renderRecord(item, true))	
	},
	renderTaskItem: function(item, index){
		if (item === undefined) return;
		if (filter.currentFilterType(item)) $('#task_container').append(ui.renderRecord(item, true)); 
	},
	renderRecord: function(item, full){
		let rec = '<div>' + item.title + '</div><div>' + item.descr + '</div><div><span class="btn edit">Edit</span><span class="btn done">Done</span><span class="btn del">Delete</span><span class="info_time">creted: ' + date_formated(item.created) + (item.done != null ? ' done: '+date_formated(item.done): '') + '</span></div>';
		
		if (full) return '<div taskId="' + item.id + '"' +(item.done != null ? ' class="work_is_done"': '') + '>' + rec + '</div>';
		else return rec;
	},
	orderChange: function(){
		sort.Init(sort[$(this).attr('funcName')]);
		$('#order_menu > span').text('Order By ' + $(this).text());
		$('#order_menu li').removeClass('active');
		$(this).addClass('active');
		ui.ShowTaskList();
	},
	filterChange: function(){
		filter.Init(filter[$(this).attr('funcName')]);	
		$('#filter_menu > span').text($(this).text());
		$('#filter_menu li').removeClass('active');
		$(this).addClass('active');
		ui.ShowTaskList();
	}
};

function date_formated(d){
	d = new Date(d);
	var dd = dateDig(d.getDate());
	var mm = dateDig(d.getMonth());
	var hh = dateDig(d.getHours());
	var mn = dateDig(d.getMinutes());
	var yyyy = d.getFullYear();
	
	return [dd, mm, yyyy].join('.') + ' ' + [hh, mn].join(':');
}

function dateDig(v){
	return v > 10 ? v.toString() : '0' + v;
}