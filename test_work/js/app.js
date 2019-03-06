var app = {
	error: {
		ls_failed:		'localStorage is not available',
		lost_record:	'Error: lost record'
	},
	InitStorage: function(){
		if (!window.localStorage) return false;
		
		app.storage = window.localStorage;
		return true;
	},
	SaveTasks: function(){
		app.storage.setItem('TaskList', TaskList.getAsString());
	},
	LoadTasks: function(){
		var sarr = app.storage.getItem('TaskList');
		
		if (sarr) {
			sarr = JSON.parse(sarr);
			if (Array.isArray(sarr)){
				TaskList = new TaskListClass(sarr.slice());
			}
		}
		
		if (TaskList === undefined) TaskList = new TaskListClass([]);
	},
	GetRendererTask(){
		if (Array.isArray(TaskList.data) && TaskList.data.length > 0){
			return (TaskList.data.slice()).sort(sort.currentSortType);
		}
		else return [];
	}
};

var sort = {
	byTitleASC: 	function(a, b){
		return a.title.localeCompare(b.title);
	},
	byTitleDesc: 	function(a, b){
		return b.title.localeCompare(a.title);
	},
	byDateASC: 		function(a, b){
		return new Date(a.created) - new Date(b.created); 
	},
	byDateDesc: 	function(a, b){
		return new Date(b.created) - new Date(a.created);
	},
	Init:			function(f){
		sort.currentSortType = f === undefined ? sort.byTitleDesc : f;
	}
};

var filter = {
	ShowAll: 		function(a){
		return true;
	},
	ShowInProgress: function(a){
		return !a.done;
	},
	ShowIsDone: 	function(a){
		return a.done; 
	},
	Init:			function(f){
		filter.currentFilterType = f === undefined ? filter.ShowAll : f;
	}
};