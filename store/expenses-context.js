import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expense) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const newId = new Date().toString() + Math.random().toString();
      return [{ ...action.payload /*, id: newId*/ }, ...state];
    case "SET":
      return action.payload.reverse();

    case "UPDATE":
      const updatableIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      ); //get the index
      const updatableExpense = state[updatableIndex]; //get the expense based on index
      const updatedItem = { ...updatableExpense, ...action.payload.data }; //update the expense
      const updatedExpenses = [...state]; // get the entire current array
      updatedExpenses[updatableIndex] = updatedItem; // replace the expense in array with new values
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id != action.payload);
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpensesContextProvider;
