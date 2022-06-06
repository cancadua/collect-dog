import "./App.css";
import { useState } from "react";
import Modal from "./Modal";
import "./index.css";
import DoggiesBreedList from "./DoggiesBreedList";

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

const App = () => {
  const [list, setList] = useState();
  const [pop, setPop] = useState("");
  const [breed, setBreed] = useState("");

  const displayBreed = (breedName) => {
    setBreed(breedName);
  };

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
    <div className="container">
      <div className="App">
        <div className="navigation">
          <button
            onClick={(e) => {
              displayBreed("");
            }}
            className={"breeds"}
            style={{ backgroundColor: "#444" }}
          >
            HOME
          </button>
          {list &&
            list.map((item, i) => {
              return (
                <button
                  key={i}
                  onClick={(e) => {
                    displayBreed(e.target.innerHTML);
                  }}
                  className={"breeds"}
                >
                  {item.breed}
                </button>
              );
            })}
        </div>
        {breed === "" ? (
          <button className={"get-a-dog"} onClick={newDog}>
            🐶 Click to find new dog!
          </button>
        ) : (
          <DoggiesBreedList
            list={list.filter((item) => item.breed === breed)}
          />
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
