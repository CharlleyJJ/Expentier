import { currencyFormatter } from "@/lib/utils";

function ExpenseCategoryItem({ title, total, color }) {
  return (
    <button>
      <div className="flex items-center justify-between px-4 py-3  bg-gradient-to-tr  from-gray-700 via-gray-900 to-black rounded-3xl  hover:border transition hover:border-slate-700  duration-700 ease-in-out hover:scale-105 ">
        <div className="flex items-center gap-2">
          {/*Circle Div, Could be an Icon*/}
          <div
            className="w-[25px] h-[25px] rounded-full bg-slate-500"
            style={{ backgroundColor: color }}
          />
          <h4 className="capitalize">{title}</h4>
        </div>
        <p>{currencyFormatter(total)}</p>
      </div>
    </button>
  );
}

export default ExpenseCategoryItem;
