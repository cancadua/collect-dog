import "./breedPicturesList.css";

const BreedPicturesList = ({ breedList }) => {
  return (
    <div className="breed-dog-list">
      {breedList.images.map((item, i) => {
        return <img key={i} src={item} alt={"image missing"} />;
      })}
    </div>
      
  );
};

export default BreedPicturesList;
