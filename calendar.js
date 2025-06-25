function Calendar(year, month) {
    this.year = year;
    this.months = [];
    while (month < 12) {
        this.months.push(new Month(year, month));
        month++;
    }
    const currentDate = new Date();
    this.currentMonth = this.months[currentDate.getMonth()];
    this.currentMonth.currentDay = this.currentMonth.days[currentDate.getDate() - 1];

    const todoHeadline = document.getElementById("todoHeadline");
    todoHeadline.textContent = this.currentMonth.currentDay.weekday + " - " +
                                this.currentMonth.name + " " +
                                this.currentMonth.currentDay.date;
    const taskList = this.currentMonth.currentDay.getHTML();
    todoContainer.appendChild(taskList);
    this.renderTemplate();
}

Calendar.prototype.nextMonth = function() {
    let index = this.months.indexOf(this.currentMonth);
    if (index >=this.months.length - 1) {
        this.months = this.createYear(this.year + 1);
    }
    this.currentMonth = this.months[index + 1];
    this.renderTemplate();
    return true;
}

Calendar.prototype.previousMonth = function() {
    let index = this.months.indexOf(this.currentMonth);
    if (index <= 0) {
        this.months = this.createYear(this.year - 1);
        index = this.months.indexOf(this.currentMonth);
    }
    this.currentMonth = this.months[index - 1];
    this.renderTemplate();
    return true;
}

Calendar.prototype.createYear = function(year) {
    let newMonths = [];
    let month = 0;
    while (month < 12) {
        newMonths.push(new Month(year, month));
        month++;
    }
    if (this.year < year) {
        return this.months.concat(newMonths);
    } else {
        return newMonths.concat(this.months);
    }
}

Calendar.prototype.renderTemplate = function() {
    this.year = this.currentMonth.year;
    const monthName = document.getElementById("month-name");
    monthName.textContent = this.currentMonth.name + " - " + this.currentMonth.year;
    this.currentMonth.renderCalendar();

}
