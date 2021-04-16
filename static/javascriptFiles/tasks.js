class Task {
    constructor(taskName, pointValue){
        this.taskName = taskName;
        this.pointValue = pointValue;
        this.progress = 0;

    }
    
    workOnTask(workApplied){
        this.progress += workApplied;
    }
}

