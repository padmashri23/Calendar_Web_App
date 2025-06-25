function Day(weekday, date) {
    this.date = date;  
    this.weekday = weekday;
    this.tasks = [];
}

Day.prototype.getHTML = function() {
    let list = todoContainer.querySelector("ul");
    if (!list) {
        list = document.createElement("ul");
        list.id = "todo-list";
    } else {
        list.innerHTML = "";
    }

    for (let i = 0; i < this.tasks.length; i++) {
        list.appendChild(this.tasks[i]);
    }
    return list;
}


Day.prototype.addTask = function(task){
    const taskItem = this.createTask(task);
    this.tasks.push(taskItem);
    const allDays = document.querySelectorAll(".day");
    for (let dayEl of allDays) {
        if (parseInt(dayEl.textContent.trim()) === this.date && !dayEl.classList.contains("unused")) {
            if (!dayEl.querySelector(".event-pin")) {
                const pin = document.createElement("div");
                pin.classList.add("event-pin");
                dayEl.appendChild(pin);
            }
        }
    }
}


Day.prototype.createTask = function(task) {
    const li = document.createElement("li");
    const taskItem = document.createElement("span");
    taskItem.textContent = task;
    const removeButton = document.createElement("button");
    removeButton.className = "remove";
    removeButton.textContent = "X";
    li.appendChild(taskItem);
    li.appendChild(removeButton);
    return li;
}

Day.prototype.removeTask = function(task) {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
    if (this.tasks.length === 0) {
        const allDays = document.querySelectorAll(".day");
        for (let dayEl of allDays) {
            if (parseInt(dayEl.textContent.trim()) === this.date) {
                const pin = dayEl.querySelector(".event-pin");
                if (pin) {
                    pin.remove();
                }
            }
        }
    }
}

