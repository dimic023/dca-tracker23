import { AiFillDelete } from "react-icons/ai";

const Entry = (props) => {
  const valueNow = (props.btcPrice * props.amount).toFixed(0);
  const roi = (
    ((valueNow - props.purchaseValue) / props.purchaseValue) *
    100
  ).toFixed(1);

  // function removePurchase(id) {
  //   console.log(id);
  // }

  return (
    <tr>
      <td>{props.date}</td>
      <td>${props.purchaseValue}</td>
      <td className="hideOnMobile">{props.amount}</td>
      <td>${props.coinPrice}</td>
      <td>${valueNow}</td>
      <td>{roi}%</td>
      <td>
        <AiFillDelete
          className="deleteIcon"
          onClick={() => props.onRemoveEntry(props.id)}
        />
      </td>
    </tr>
  );
};

export default Entry;
