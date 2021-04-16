function Task(taskName, pointValue) {

    this.taskName = taskName;
    this.pointValue = pointValue;
    this.progress = 0;


    
}

function workOnTask(workApplied){
        this.progress += workApplied;
}