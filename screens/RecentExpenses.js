import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/data";
import { useContext, useEffect, useState } from "react";
import { fetchExpenses } from "../util/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState();
  const expenseContext = useContext(ExpenseContext);
  // const [fetchExpense, setFetchExpense] = useState([]);

  useEffect(() => {
    setIsDataLoading(true);
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        expenseContext.setExpenses(expenses);
      } catch (error) {
        console.log("Error", error);
        setError("Could not fetch expenses");
      }

      setTimeout(() => {
        // Code to be executed after the delayconsole.log('This message appears after 2 seconds.');
        setIsDataLoading(false);
      }, 2000);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (isDataLoading) {
    return <LoadingOverlay />;
  } else {
    if (error) {
      return <ErrorOverlay message={error} onConfirm={errorHandler} />;
    }
  }

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText="No Expenses Registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
