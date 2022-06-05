import "./doggiesBreedList.css";

const DoggiesBreedList = ({ list }) => {
  return (
    <div className={"imagesContainer"}>
      {list[0].images.map((item, i) => {
        return <img key={i} src={item} alt={"waddup"} />;
      })}
    </div>
  );
};

export default DoggiesBreedList;
