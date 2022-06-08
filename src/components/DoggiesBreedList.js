import "../styles/doggiesBreedList.css";

const DoggiesBreedList = ({ list }) => {
  return (
    <div className={"imagesContainer"}>
      {list[0].images.map((item, i) => {
        return <img key={i} src={item} alt={"image missing"} />;
      })}
    </div>
  );
};

export default DoggiesBreedList;
