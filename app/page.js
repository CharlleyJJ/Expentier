"use client";
import { useState} from "react";
import ExpensesCategoryItem from "@/components/ExpensesCategoryItem";
import { currencyFormatter} from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AddIncomeModal from "@/components/modals/AddIncomeModal"




ChartJS.register(ArcElement,Tooltip, Legend)



const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "#000",
    total: 1000,
  },

  {
    id: 2,
    title: "Conta Água",
    color: "#11aab1",
    total: 376,
  },
  {
    id: 3,
    title: "Carro",
    color: "#a13fff",
    total: 222,
  },
  {
    id: 4,
    title: "Comida",
    color: "#a12222",
    total: 100,
  },
];

export default function Home() {
{

  const [income,setIncome] = useState([]);
  console.log(income);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);



  return (
  <>
  {/*Modal*/}
  <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal}/>

    <main className="container max-w-2xl px-6 mx-auto overflow-hidden">
      {/*wrapper*/}
      <section className="py-3">
        <small className="text-gray-400 text-md">My Balance</small>
        {/*Formatter function Call*/}
        <h2 className="text-4xl font-bold"> {currencyFormatter(2650)} </h2>
      </section>
      {/*Buttons that changes*/}
      <section className="flex gap-2 items-center py-3">
        <button  className="btn btn-primary"> + Expenses</button>
        <button onClick={() =>{
          setShowAddIncomeModal(true);
        }} className="btn btn-primary-outline"> + Income</button>
      </section>

      {/*Expenses*/}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {/*Expenses Items*/}
          {DUMMY_DATA.map((expense) => {
            return (
              <ExpensesCategoryItem
              key={expense.id}
                color={expense.color}
                title={expense.title}
                total={expense.total}
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
            <Doughnut data=
            {{
              labels: DUMMY_DATA.map(expense => expense.title),
              datasets:[
                {
                  label:"Expenses",
                  data: DUMMY_DATA.map(expense => expense.total),
                  backgroundColor: DUMMY_DATA.map(expense => expense.color),
                  borderColor: ['#1b2333'],
                  borderWidth:5,
                }
              ],
            }}
            />
          </div>
      </section>
    </main>
  </>
  );}
}
