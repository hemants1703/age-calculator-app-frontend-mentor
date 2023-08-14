
// Prevents user from entering non-numeric characters in the input field
document.querySelector("input[type='number']").addEventListener("keypress", function (evt) {
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
    }
});

function validateDate(dateString, dob) {

    // Regular expression to match the YYYY-MM-DD format
    var datePattern = /^\d{4}-\d{2}-\d{2}$/;

    let returnValue = true;

    if (!datePattern.test(dateString)) {

        // if(dob.day === "") {
        //     document.querySelector(".day-input-element label span").style.color = "hsl(0, 100%, 67%)";
        //     document.querySelector("#dayInput").style.borderColor = "hsl(0, 100%, 67%)";
        //     document.querySelector(".errorMessage-day").innerHTML = "This field is required";
        // }

        // if(dob.month === "") {
        //     document.querySelector(".month-input-element label span").style.color = "hsl(0, 100%, 67%)";
        //     document.querySelector("#monthInput").style.borderColor = "hsl(0, 100%, 67%)";
        //     document.querySelector(".errorMessage-month").innerHTML = "This field is required";
        // }

        // if(dob.year === "") {
        //     document.querySelector(".year-input-element label span").style.color = "hsl(0, 100%, 67%)";
        //     document.querySelector("#yearInput").style.borderColor = "hsl(0, 100%, 67%)";
        //     document.querySelector(".errorMessage-year").innerHTML = "This field is required";
        // }

        // Simplified version of the above code
        const fields = [
            { element: ".day-input-element", input: "#dayInput", error: ".errorMessage-day", prop: "day" },
            { element: ".month-input-element", input: "#monthInput", error: ".errorMessage-month", prop: "month" },
            { element: ".year-input-element", input: "#yearInput", error: ".errorMessage-year", prop: "year" }
        ];

        for (const field of fields) {
            if (dob[field.prop] === "") {
                setError(`${field.element} label span`, `${field.input}`);
                document.querySelector(field.error).innerHTML = "This field is required";
            }
        }

        returnValue = false;
    }

    var year = parseInt(dateString.substring(0, 4));
    var month = parseInt(dateString.substring(5, 7));
    var day = parseInt(dateString.substring(8, 10));

    // Check if the year, month, and day are within valid ranges
    if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
        returnValue = false;
    }

    // Additional checks for months with 30 or 31 days
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
        returnValue = false;
    }

    // Additional check for February and leap years
    if (month === 2) {
        if (day > 29) {
            returnValue = false;
        }
        if (day === 29 && (year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0))) {
            returnValue = false;
        }
    }

    return returnValue;
}

function calculateAge() {

    const dayInput = document.querySelector("#dayInput").value;
    const monthInput = document.querySelector("#monthInput").value;
    const yearInput = document.querySelector("#yearInput").value;

    const dobString = `${yearInput}-${monthInput}-${dayInput}`;

    const dob = {
        day: dayInput,
        month: monthInput,
        year: yearInput
    }

    if (validateDate(dobString, dob)) {

        // DD-MM-YYYY
        const dob = new Date(dobString);

        const currentDate = new Date();

        if (isNaN(dob) || dob > currentDate)
            return null;

        let years = currentDate.getFullYear() - dob.getFullYear();
        let months = currentDate.getMonth() - dob.getMonth();
        let days = currentDate.getDate() - dob.getDate();

        if (days < 0) {
            var lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            months--;
            days = lastMonthDate - dob.getDate() + currentDate.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        days = Math.floor(days);

        // Age of the user
        const age = {
            "years": years,
            "months": months,
            "days": days
        }

        displayAge(age);

    } else {
        evaluateError(dob);
        console.log("Invalid date of birth");
    }

}

function evaluateError(dob) {

    const day = parseInt(dob.day);
    const month = parseInt(dob.month);
    const year = parseInt(dob.year);

    let currentDate = new Date();    

    // Leap year = 29 days in February = 366 days in a year
    // Non-leap year = 28 days in February = 365 days in a year

    // const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(day < 1 || day > 31) {
        document.querySelector(".errorMessage-day").innerHTML = "Must be a valid day";
        setError(".day-input-element label span", "#dayInput");
    }

    if(day > 29 && month === 2 && year % 4 === 0) {
        // Leap year
        document.querySelector(".errorMessage-day").innerHTML = "Must be a valid day";
        setError(".day-input-element label span", "#dayInput");
    }

    if(day > 30 && month === 1 || month === 3 || month === 5 || month === 8 || month === 10) {
        document.querySelector(".errorMessage-day").innerHTML = "Must be a valid day";
        setError(".day-input-element label span", "#dayInput");
    }

    if(day > 31 && month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        document.querySelector(".errorMessage-day").innerHTML = "Must be a valid day";
        setError(".day-input-element label span", "#dayInput");
    }

    if(month < 1 || month > 12) {
        document.querySelector(".errorMessage-month").innerHTML = "Must be a valid month";
        setError(".month-input-element label span", "#monthInput");
    }

    let currentYear = currentDate.getFullYear();

    if(year < 1000 || year > currentYear) {
        document.querySelector(".errorMessage-year").innerHTML = "Must be in the past";
        setError(".year-input-element label span", "#yearInput");
    }

}

function setError(label, input) {

    document.querySelector(label).style.color = "hsl(0, 100%, 67%)";
    document.querySelector(input).style.borderColor = "hsl(0, 100%, 67%)";

}

function displayAge(age) {

    // Display the user's age
    document.querySelector("#yearValue .years").innerHTML = age.years;
    document.querySelector("#monthValue .months").innerHTML = age.months;
    document.querySelector("#dayValue .days").innerHTML = age.days;

}