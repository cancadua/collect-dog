import { useState } from "react";

import Modal from "./Modal";
import DoggiesBreedList from "./DoggiesBreedList";
import {capitalizeFirstLetter, handleBreedName} from "../utils/Functions";

import "../styles/app.css";
import "../index.css";
import "../styles/navigation.css"


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
        const newBreed = capitalizeFirstLetter(handleBreedName(data.message));

        setList((prevList) => {
          if (prevList === undefined)
            return [
              {
                breed: newBreed,
                images: [data.message]
              }
            ];

          const indexOfBreed = prevList?.findIndex(
            (item) => item.breed === newBreed
          );

          if (indexOfBreed >= 0) {
            if (prevList[indexOfBreed].images.includes(data.message)) return [...prevList];
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
    <div className={'app'}>

      {pop && (
        <Modal closeModal={() => setPop("")}>
          <img src={pop} alt={""} className={"image"} />
        </Modal>
      )}

      {/*<Navigation displayBreed={(prop) => setBreed(prop)} list={list}/>*/}

      <div className="navigation">
        <button
          onClick={() => {
            displayBreed("");
          }}
          className={"breeds"}
          style={{ backgroundColor: "#446644" }}
        >
          HOME
        </button>
        {list &&
          list?.map((item, i) => {
            return (
              <button
                key={i}
                onClick={(e) => {
                  displayBreed(e?.target.innerHTML);
                }}
                className={"breeds"}
              >
                {item.breed}
              </button>
            );
          })}
      </div>

      <div className="container">
        <div>
          {breed === "" ? (
            <button className={"get-a-dog"} onClick={newDog}>
              🐶 Click to find new dog!
            </button>
          ) : (
            <DoggiesBreedList
              list={list?.filter((item) => item.breed === breed)}
            />
          )}
        </div>
      </div>
    </div>


  );
};

export default App;
