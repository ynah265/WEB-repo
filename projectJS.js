// Dynamically generate meal inputs for each day
document.addEventListener("DOMContentLoaded", () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const meals = ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner"];
    const mealInputs = document.getElementById("mealInputs");

    days.forEach(day => {
        const dayHeader = document.createElement("h3");
        dayHeader.textContent = day;
        mealInputs.appendChild(dayHeader);

        meals.forEach(meal => {
            const label = document.createElement("label");
            label.textContent = `${meal}: `;
            const input = document.createElement("input");
            input.type = "text";
            input.name = `${day}_${meal}`;
            input.required = true;

            mealInputs.appendChild(label);
            mealInputs.appendChild(input);
            mealInputs.appendChild(document.createElement("br"));
        });
    });
});

// Generate the meal plan
document.getElementById("generateButton").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    const name = document.getElementById("name").value;
    const goal = document.getElementById("goal").value;
    const form = document.getElementById("mealPlanForm");
    const data = new FormData(form);

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const meals = ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Dinner"];

    let mealPlanHtml = `
        <html>
        <head>
            <title>${name}'s Meal Plan</title>
        </head>
        <body>
            <h1>Weekly Meal Plan for ${name}</h1>
            <p>Email: ${email}</p>
            <p>Goal for the Week: ${goal}</p>
            <table border="1">
                <tr>
                    <th>Day</th>
                    <th>${meals.join("</th><th>")}</th>
                </tr>`;

    days.forEach(day => {
        mealPlanHtml += `<tr><td>${day}</td>`;
        meals.forEach(meal => {
            const inputName = `${day}_${meal}`;
            mealPlanHtml += `<td>${data.get(inputName)}</td>`;
        });
        mealPlanHtml += "</tr>";
    });

    mealPlanHtml += `
            </table>
        </body>
        </html>
    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(mealPlanHtml);
    newWindow.document.close();
});

// Print the planner
document.getElementById("printButton").addEventListener("click", () => {
    window.print();
});

// Download the planner as a file
document.getElementById("downloadButton").addEventListener("click", () => {
    const blob = new Blob([document.documentElement.outerHTML], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mealPlan.html";
    link.click();
});
