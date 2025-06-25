function Month(year, month) {
    const weekDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    this.year = year;
    this.date = new Date(year, month);
    this.name = monthNames[this.date.getMonth()];
    this.days = [];
    // get max days of the month
    this.MAXDAYS = new Date(year, month + 1, 0).getDate();
    // need to subtract one because date.getDay returns 0 for sunday
    this.currentWeekDay = this.date.getDay() - 1;
    // work around for the sunday case where currentWeekDay becomes -1
    if (this.currentWeekDay === -1) {
        this.currentWeekDay = 6;
    }
    for (let i = 0; i <= this.MAXDAYS - 1; i++) {
        this.days[i] = new Day(weekDays[this.currentWeekDay % 7], i + 1);
        this.currentWeekDay++;
    }
    this.currentDay = this.days[0];
}

Month.prototype.renderCalendar = function () {
    // 1. Remove all event pins for other months and correctly co-ordinate events
    const allPins = document.querySelectorAll('.event-pin');
    allPins.forEach(pin => pin.remove());

    divDays.style.opacity = 0.0;
    fadeIn(divDays);

    let startDay = this.date.getDay() - 1;
    if (startDay === -1) {
        startDay = 6;
    }

    const dayCards = document.getElementsByClassName("day");
    let dayNumber = 1;

    const today = new Date();
    const isCurrentMonth =
        today.getMonth() === this.date.getMonth() &&
        today.getFullYear() === this.date.getFullYear();

    for (let i = 0; i < dayCards.length; i++) {
        if (i >= startDay && dayNumber <= this.MAXDAYS) {
            dayCards[i].className = "day";
            dayCards[i].firstChild.textContent = dayNumber;

            if (isCurrentMonth && dayNumber === today.getDate()) {
                dayCards[i].classList.add("today");
            }

            // Add pin if tasks exist
            const dayObj = this.days[dayNumber - 1];
            if (dayObj && dayObj.tasks.length > 0) {
                const pin = document.createElement('div');
                pin.classList.add('event-pin');
                dayCards[i].appendChild(pin);
            }

            dayNumber++;
        } else {
            dayCards[i].className = "day unused";
            dayCards[i].firstChild.textContent = "";
        }
    }
};
