var TaskList;

$(document).ready(function(){
	if (!app.InitStorage()){
		$('#task_container').html(app.error.ls_failed);
		return;
	}
	
	sort.Init();
	filter.Init();
	
	app.LoadTasks();
	ui.ShowTaskList();	
	
	$('#add_task').click(function(e){
		ui.ShowEditor();
	});
	
	$('#task_editor .save').click(ui.SaveData);
	$('#task_editor .cancel').click(ui.HideEditor);
	$('#clear_all_task').click(ui.ClearAll);
	
	$(document).on('click','.del',  ui.deleteTask);
	$(document).on('click','.done', ui.doneTask);
	$(document).on('click','.edit', ui.editTask);
	
	$('#order_menu > ul > li').click(ui.orderChange);
	$('#filter_menu > ul > li').click(ui.filterChange);
});