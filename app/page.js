"use client";
import { useState, useRef, useEffect } from "react";
import ExpensesCategoryItem from "@/components/ExpensesCategoryItem";
import Modal from "@/components/Modal";
import { currencyFormatter, dataFormatter } from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Firebase

import {db} from '@/lib/firebase'
import {collection, addDoc, getDocs} from 'firebase/firestore';
import { data } from "autoprefixer";



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

  const unitRef = useRef();
  const quantityRef = useRef();
  const amountRef = useRef();
  const databRef = useRef();
  const fontRef = useRef();
  const methodRef = useRef();

  // Handler Functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();
    const newIncome = {
      units: unitRef.current.value,
      quantity: quantityRef.current.value,
      amount: amountRef.current.value,
      datab: databRef.current.value,
      font: fontRef.current.value,
      method: methodRef.current.value,
      createdAt: new Date(),
    };
    //console.log(newIncome);

    const collectionRef = collection(db,"income")
    try {
      const docSnap = await addDoc(collectionRef,newIncome);
    } catch (error) {
      console.log(error.message);
    }
    
  };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);
      
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt && new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };
    getIncomeData();
  }, [])

  return (
  <>
  {/*Modal*/}
   <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
    <section>
      <div className="flex flex-col gap-4">
        <h2 className="px-4 py-2 text-2xl font-bold">Add Income</h2>
      </div>
        <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
          {/*Unit*/}
          <div className="input-group pb-3">
            <label htmlFor="units">Unit</label>
              <select required name="units" id="units" ref={unitRef} defaultValue="BRL" >
                <option value="BRL">BRL</option>
                <option value="USD">USD</option>
              </select>
          </div>
          {/*Quantity*/}
          <div className="input-group pb-2">
            <label htmlFor="quantity">Income Quantity</label>
            <input type="number" min={0.01} step={0.01} ref={quantityRef} placeholder="Enter Income Quantity"/>
          </div>
          {/*Amount*/}
          <div className="input-group pb-2">
            <label htmlFor="amount">Income Amount</label>
            <input required type="number" name="amount" ref={amountRef} min={0.01} step={0.01} placeholder="Enter income amount"/>
          </div>
          {/*Data*/}
          <div className="input-group pb-2">
            <label  htmlFor="datab">Income Data</label>
            <input required type="datetime-local" id="datab" name="datab" ref={databRef} placeholder="Enter income data"/>
          </div>
          {/*Font*/}
          <div className="input-group pb-1">
            <label htmlFor="font">Income Font</label>
            <input required type="text" name="font" ref={fontRef} placeholder="Enter income font"/>
          </div>
          {/*Method*/}
          <div className="input-group pb-1">
            <label htmlFor="method">Income Method</label>
            <input type="text" name="method" ref={methodRef} placeholder="Enter income method"/>
          </div>

          <button type="submit" className="btn btn-primary-add" > Add Income</button>
          <div>
            <h3 className="text-2xl font-bold py-2">      Income History      </h3>
            {income.map(i => {
              return(
                <div key={i.id}>
                  <div>
                    <p className="font-semibold">{i.font}</p>
                    <small>{dataFormatter(i.datab)}</small>
                  </div>
                </div>
              )
            })}
          </div>
        </form>
          
        
    </section>
    
   </Modal>
    

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
