"use client";
import { useState } from "react";
import ExpensesCategoryItem from "@/components/ExpensesCategoryItem";
import { currencyFormatter } from "@/lib/utils";
import { IoClose } from "react-icons/io5"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";



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
  const [modalIsOpen, setModalIsOpen] = useState(true);


  return (
  <>
  {/*Modal*/}
  {modalIsOpen && (
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <div className="container mx-auto mt-5 max-w-2xl h-[100vh] rounded-3xl glass px-4 py-6">
        <button 
        onClick={() =>{
          setModalIsOpen(false);
        }} 
        className="w-11 h-11 mb-4 font-bold rounded-full hover:bg-transparent hover:transition hover:duration-100 hover:scale-110  hover:border hover:border-white ">
         <IoClose className="w-10 h-10 mb-4 font-bold "/>
        </button>
        <h3>Hello Modal</h3>
      </div>
    </div>

  )}
    <main className="container max-w-2xl px-6 mx-auto overflow-hidden">
      {/*wrapper*/}
      <section className="py-3">
        <small className="text-gray-400 text-md">My Balance</small>
        {/*Formatter function Call*/}
        <h2 className="text-4xl font-bold"> {currencyFormatter(2650)} </h2>
      </section>
      {/*Buttons that changes*/}
      <section className="flex gap-2 items-center py-3">
        <button onClick={() =>{
          setModalIsOpen(true);
        }} className="btn btn-primary"> + Expenses</button>
        <button className="btn btn-primary-outline"> + Income</button>
      </section>

      {/*Expenses*/}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {/*Expenses Items*/}
          {DUMMY_DATA.map((expense) => {
            return (
              <ExpensesCategoryItem
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
                  borderColor: ['#aaaaaa'],
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
