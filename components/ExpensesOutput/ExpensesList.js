import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return (
    <ExpenseItem {...itemData.item} />
    // <ExpenseItem
    //   decription={itemData.item.description}
    //   date={itemData.item.date}
    //   amount={itemData.item.amount}
    // />
  );
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
