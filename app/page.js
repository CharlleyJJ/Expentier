"use client";
import { useState, useContext, useEffect} from "react";

import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";



import ExpensesCategoryItem from "@/components/ExpensesCategoryItem";
import { currencyFormatter} from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AddIncomeModal from "@/components/modals/AddIncomeModal"
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn.js";




ChartJS.register(ArcElement,Tooltip, Legend)




export default function Home() {
{

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const {values} = useContext(financeContext);
  const{user} = useContext(authContext);


  

  const [balance, setBalance] = useState(0);

  const {expenses} = values;
  const {income} = values;


  

  const totalExpenses = expenses.reduce((total, expense) => total + expense.total, 0);
  const expensePercentages = expenses.map(expense => ((expense.total / totalExpenses) * 100).toFixed(2));

  useEffect(()=> {
    const incomeTotal = income.reduce((total, i) => {
      return total + i.amount;
    }, 0);
  
    const expensesTotal = expenses.reduce((total, e) => {
      return total + e.total;
    }, 0);
  
    const newBalance = incomeTotal - expensesTotal;
  
    setBalance(newBalance);
  }, [expenses, income]);

if(!user){
  return <SignIn/>;
}
  

  return (
  <>
  {/*Modal*/}
  {/*Add Income Modal*/}
  <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal}/>
  {/*Add Expenses Modal*/}
  <AddExpensesModal show={showAddExpenseModal} onClose={setShowAddExpenseModal}/>

    <main className="container max-w-2xl px-6 mx-auto overflow-hidden">
      {/*wrapper*/}
      <section className="py-3">
        <small className="text-gray-400 text-md">My Balance</small>
        {/*Formatter function Call*/}
        <h2 className="text-4xl font-bold"> {currencyFormatter(balance)} </h2>
      </section>
      {/*Buttons that changes*/}
      <section className="flex gap-2 items-center py-3">
        <button  className="btn btn-primary"onClick={() =>{
          setShowAddExpenseModal(true);
        }}> + Expenses</button>
        <button onClick={() =>{
          setShowAddIncomeModal(true);
        }} className="btn btn-primary-outline"> + Income</button>
      </section>

      {/*Expenses*/}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {/*Expenses Items*/}
          {expenses.map((expense) => {
            return (
              <ExpensesCategoryItem
              key={expense.id}
              expense={expense}
              />
            );
          })}
        </div>
      </section>

      {/*Chart Section*/}
      <section className="py-6">
          <h3 className="text-2xl">
          Stats
          </h3>
          <div className="w-1/2 mx-auto ">
          <Doughnut 
  data={{
    labels: expenses.map(expense => expense.title),
    datasets:[
      {
        label:"Expenses",
        data: expenses.map(expense => expense.total),
        backgroundColor: expenses.map(expense => expense.color),
        borderColor: ['#1b2333'],
        borderWidth:1,
      }
    ],
  }}
  options={{
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            var label = context.label;
            var value = parseFloat(context.parsed.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            var percentage = expensePercentages[context.dataIndex];
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  }}
/>
          </div>
      </section>
    </main>
  </>
  );}
}
