import { useState } from "react";

import Modal from "./components/Modal";
import BreedPicturesList from "./components/BreedPictureList/BreedPicturesList";
import { capitalizeFirstLetter, handleBreedName } from "./utils/functions";
import Navigation from './components/Navigation/Navigation'

import "./styles/app.css";
import "./index.css";
import "./components/Navigation/navigation.css"


const Main = () => {

    const [breedList, setBreedList] = useState();
    const [pop, setPop] = useState("");
    const [breed, setBreed] = useState("");
    const [dimensions, setDimensions] = useState({x: "50%", y: "50%", t: "translate(-50%, -50%)"})

    const getBreedListHandler = (breed) => {
        setBreed(breed)
        setPop("")
    }
    const newDog = async () => {


        setDimensions({
            x: Math.round(Math.random() * (window.innerWidth - 100)),
            y: Math.round(Math.random() * (window.innerHeight - 100)),
        })

        await fetch("https://dog.ceo/api/breeds/image/random")
            .then((response) => response.json())
            .then((data) => {
                const newBreed = capitalizeFirstLetter(handleBreedName(data.message));

                setBreedList((prevList) => {
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
                    <img src={pop} alt={""} className={"image"}/>
                </Modal>
            )}
            <Navigation displayBreed={(prop) => getBreedListHandler(prop)} breedList={breedList}/>
            <div className="container">
                {breed === "" ? (
                    <div className="search-container">
                        <button className={"get-a-dog"} style={{
                            width: 100,
                            height: 100,
                            left: dimensions.x,
                            top: dimensions.y,
                            transform: dimensions.t
                        }} onClick={newDog}>
                            🐶
                        </button>
                    </div>
                ) : (
                    <BreedPicturesList
                        breedList={breedList?.find(item => item.breed === breed)}
                    />
                )}
            </div>
        </div>
    );
};

export default Main;
