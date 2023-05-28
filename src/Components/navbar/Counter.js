import style from "./Counter.module.css";
import { useSelector } from "react-redux";

const Counter = () => {
  const numberOfItems = useSelector((store) => store.totalItems);

  return (
    <div className={style.counter}>
      <h3>{numberOfItems}</h3>
    </div>
  );
};

export default Counter;
