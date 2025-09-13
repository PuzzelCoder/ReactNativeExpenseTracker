import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpenseContext);
  const id = route.params?.expenseId;
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === id
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsLoading(true);

    try {
      await deleteExpense(id);
      expensesCtx.deleteExpense(id);
      navigation.goBack();
    } catch (error) {
      setTimeout(() => {
        // Code to be executed after the delayconsole.log('This message appears after 2 seconds.');
        setIsLoading(false);
        setError("Could not delete expense,Please try later.");
      }, 2000);
    }
  }

  function errorHandler() {
    setError(null);
  }
  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateExpense(id, expenseData);
        expensesCtx.updateExpense(id, expenseData);
        navigation.goBack();
      } else {
        // it is for local database
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
        navigation.goBack();
      }
    } catch (error) {
      setError("Could not save data, Please try later.");
      setTimeout(() => {
        // Code to be executed after the delayconsole.log('This message appears after 2 seconds.');
        setIsLoading(false);
      }, 2000);
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  } else {
    if (error) {
      return <ErrorOverlay message={error} onConfirm={errorHandler} />;
    }
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        cancelHandler={cancelHandler}
        confirmHandler={confirmHandler}
        deleteExpenseHandler={deleteExpenseHandler}
        defaultValues={selectedExpense}
      />
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
