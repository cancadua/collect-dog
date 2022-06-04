import "./App.css";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import "./index.css";

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

const App = () => {
  const [list, setList] = useState();
  const [pop, setPop] = useState("");
  const [breed, setBreed] = useState("");

  const newDog = async () => {
    await fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        const newBreed = capitalizeFirstLetter(
          data.message.split("/")[4].replaceAll("-", " ")
        );

        setList((prevList) => {
          if (prevList === undefined)
            return [
              {
                breed: newBreed,
                images: [data.message]
              }
            ];
          const indexOfBreed = prevList.findIndex(
            (item) => item.breed === newBreed
          );
          if (indexOfBreed >= 0) {
            prevList[indexOfBreed].images = [
              ...prevList[indexOfBreed].images,
              data.message
            ];
            return [...prevList];
          }

          return [
            ...prevList,
            {
              breed: newBreed,
              images: [data.message]
            }
          ];
        });
        setPop(data.message);
      });
  };

  return (
    <div className="App">
      <div className="navigation">
        {list &&
          list.map((item) => {
            return (
              <button onClick={setBreed(item.breed)} className={"breeds"}>
                {item.breed}
              </button>
            );
          })}
      </div>
      <div className="container">
        {breed === "" ? (
          <button className={"get-a-dog"} onClick={newDog}>
            🐶 Click to find new dog!
          </button>
        ) : (
          <div>
            {list
              .filter((item) => item.breed === breed)[0]
              .images.map((item, i) => {
                console.log(item);
                return <img key={i} src={item.image} alt={""} />;
              })}
          </div>
        )}
      </div>

      {pop && (
        <Modal closeModal={() => setPop("")}>
          <img src={pop} alt={""} className={"image"} />
        </Modal>
      )}
    </div>
  );
};

export default App;
