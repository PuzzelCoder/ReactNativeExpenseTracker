import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";
import { useContext, useLayoutEffect } from "react";

function AllExpenses() {
  const expenseContext = useContext(ExpenseContext);
  useLayoutEffect(() => {
    function deleteExpenseHandler() {
      expensesCtx.deleteExpense(id);
      navigation.goBack();
    }
    function cancelHandler() {
      navigation.goBack();
    }
    function confirmHandler() {
      navigation.goBack();
    }
  });
  return (
    <ExpensesOutput
      expenses={expenseContext.expenses}
      expensesPeriod="Total"
      fallBackText="No Registered expenses found"
    />
  );
}

export default AllExpenses;
