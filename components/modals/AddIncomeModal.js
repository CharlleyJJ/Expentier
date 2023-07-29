import {useRef,useContext} from 'react'
import { currencyFormatter, dataFormatter } from '@/lib/utils';
import Modal from "@/components/Modal.js";

import { financeContext } from '@/lib/store/finance-context';


//Icons
import {FaRegTrashAlt} from 'react-icons/fa'






function AddIncomeModal ({show, onClose}) {
  const unitRef = useRef();
  const quantityRef = useRef();
  const amountRef = useRef();
  const databRef = useRef();
  const fontRef = useRef();
  const methodRef = useRef();
  const {values: {income,addIncomeItem, removeIncomeItem}} = useContext(financeContext);
  console.log(income);

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

    try {
        await addIncomeItem(newIncome);
      } catch (error) {
        console.error(error);
      }
      
    amountRef.current.value = "";
    unitRef.current.value = "";
    quantityRef.current.value = "";
    databRef.current.value = "";
    fontRef.current.value = "";
    methodRef.current.value = "";
  };


  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
    } catch (error) {
      console.error(error);
    }
  };




    return(
    <Modal show={show} onClose={onClose}>
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


          <div className="flex flex-col gap-4 mt-6">
            <h3 className="text-2xl font-bold py-2">      Income History      </h3>
            {income.map((i) => {
              return(
                <div className="flex items-center justify-between" key={i.id}>
                  <div>
                    <p className="font-semibold">{i.font}</p>
                    <small>{dataFormatter(i.datab)}</small>
                  </div>
                  <p className="flex items-center gap-2">{currencyFormatter(i.amount)}<button onClick={() => {deleteIncomeEntryHandler(i.id)}}><FaRegTrashAlt/></button></p>
                </div>
                
              )
            })}
          </div>
        </form>
          
        
    </section>
    
   </Modal>
    
    )
}

export default AddIncomeModal;