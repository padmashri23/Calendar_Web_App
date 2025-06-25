const divDays = document.getElementById("days");
const todoContainer = document.getElementById("todo");
const calendar = new Calendar(2025, 0);
const addTaskButton = document.getElementById("add-task");
const todoList = document.getElementById("todo-list");
const nextMonthButton = document.getElementById("next-month");
const previousMonthButton = document.getElementById("previous-month");
divDays.addEventListener("click", (e) => {
    if (e.target.firstChild.textContent) {
        const index = parseInt(e.target.firstChild.textContent) - 1;
        calendar.currentMonth.currentDay = calendar.currentMonth.days[index];
        const weekday = calendar.currentMonth.currentDay.weekday;
        todoHeadline.textContent = weekday + " - " +
                calendar.currentMonth.name +
                " " + (index + 1);
        const taskList = calendar.currentMonth.currentDay.getHTML();
        todoContainer.appendChild(taskList);
    }
});


addTaskButton.addEventListener("click", () => {
    const inputField = document.getElementById("task-input");
    const task = inputField.value;
    inputField.value = "";
    inputField.focus();
    calendar.currentMonth.currentDay.addTask(task);
    const taskList = calendar.currentMonth.currentDay.getHTML();
    todoContainer.appendChild(taskList);
});


todoList.addEventListener("click", (e) => {
    if(e.target.className === "remove") {
        calendar.currentMonth.currentDay.removeTask(e.target.parentNode);
        todoList.removeChild(e.target.parentNode);
    }
});


nextMonthButton.addEventListener("click", function() {
    calendar.nextMonth();
});

previousMonthButton.addEventListener("click", function() {
    calendar.previousMonth();
});


function fadeIn(element) {
    let opacity = 0.0;
    let timer = setInterval(function() {
        if (opacity >= 0.9) {
            clearInterval(timer);
            element.style.display = "block";
        } else {
            element.style.opacity = opacity;
            element.style.filter = "alpha(opacity=" + opacity * 100 + ")";
            opacity += 0.15;
        }
    }, 100);
}
