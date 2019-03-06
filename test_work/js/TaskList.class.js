'use strict';

class TaskListClass{
	
	constructor(arr){
		this.data = arr.slice();
		this.maxId = this.getMaxId();
	}
	
	getMaxId(){
		var cmid = 0;
		for (var i in this.data){
			if (this.data[i] !== undefined && this.data[i].id > cmid) cmid = this.data[i].id;
		}
		return cmid;
	}
	
	push(new_record){
		this.maxId++;
		new_record.id = this.maxId;
		this.data.push(new_record);
		return new_record.id;
	}
	
	
	getIndex(id){
		for (var i in this.data){
			if (this.data[i] !== undefined && this.data[i].id == id) return i;
		}
		return false;
	}
	
	delete(id){
		var i = this.getIndex(id);
		if (i !== false){
			this.data.splice(i, 1);
			return true;
		}else 
			return false;
	}
	
	done(id){
		var i = this.getIndex(id);
		if (i !== false){
			this.data[i].done = new Date();
			return true;
		}else 
			return false;
	}
	
	getRecord(id){
		var i = this.getIndex(id);
		if (i !== false){
			return this.data[i];
		}else 
			return false;
	}
	
	updateRecord(new_data, id){
		var i = this.getIndex(id);
		if (i !== false){
			this.data[i].title = new_data.title;			
			this.data[i].descr = new_data.descr;
			return true;
		}else 
			return false;
	}
	
	getAsString(){
		return JSON.stringify(this.data);
	}
	
	clear(){
		this.data = [];
		this.maxId = 0;
	}
}