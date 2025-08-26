window.onload = function() {
    const user = localStorage.getItem("username");
    if (!user) { window.location.href = "login.html"; }

    const expenseList = document.getElementById("expenseList");
    const expenseDesc = document.getElementById("expenseDesc");
    const expenseAmount = document.getElementById("expenseAmount");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const totalExpenseSpan = document.getElementById("totalExpense");

    let expenses = JSON.parse(localStorage.getItem(user + "_expenses")) || [];

    function renderExpenses() {
        expenseList.innerHTML = "";
        let total = 0;
        expenses.forEach((exp, idx) => {
            total += Number(exp.amount);
            const li = document.createElement("li");
            li.textContent = `${exp.desc} - $${exp.amount}`;
            const delBtn = document.createElement("button");
            delBtn.textContent = "❌";
            delBtn.className = "ml-2 text-red-500 hover:text-red-700";
            delBtn.addEventListener("click", () => {
                expenses.splice(idx, 1);
                localStorage.setItem(user + "_expenses", JSON.stringify(expenses));
                renderExpenses();
            });
            li.appendChild(delBtn);
            expenseList.appendChild(li);
        });
        totalExpenseSpan.textContent = total;
    }

    renderExpenses();

    addExpenseBtn.addEventListener("click", () => {
        const desc = expenseDesc.value.trim();
        const amount = expenseAmount.value.trim();
        if(desc && amount) {
            expenses.push({desc, amount});
            localStorage.setItem(user + "_expenses", JSON.stringify(expenses));
            renderExpenses();
            expenseDesc.value = "";
            expenseAmount.value = "";
        }
    });
};
