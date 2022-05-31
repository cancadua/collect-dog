import './App.css';
import {useEffect, useState} from "react";
import Modal from "./Modal";
import Navigation from "./Navigation";

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function App() {

  const [list, setList] = useState()
  const [pop, setPop] = useState('');
  // const [breed, setBreed] = useState('')


  const newDog = async () => {
    await fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        const newBreed = capitalizeFirstLetter(data.message.split('/')[4].replaceAll('-', ' '))

        setList(prevList => {
          if (prevList === undefined) return (
            [{
              breed: newBreed,
              images: [data.message]
            }]
          )
          const indexOfBreed = prevList.findIndex(item => item.breed === newBreed);
          if (indexOfBreed>=0) {
            prevList[indexOfBreed].images=[...prevList[indexOfBreed].images, data.message]
            return (
              [...prevList]
            )
          }

          return (
            [...prevList, {
              breed: newBreed,
              images: [data.message]
            }]
          )
        })
        setPop(data.message)
      })
  }

  useEffect( () => {
  }, [list]);

  return (
    <div className="App">
      <Navigation data={list}/>
      <div className="container">
        <button className={'get-a-dog'} onClick={newDog}>
          🐶 Click to find new dog!
        </button>

        {pop && (
          <Modal closeModal={() => setPop('')}>
            <img src={pop} alt={''} className={'image'}/>
          </Modal>
        )}

        {/*    {*/}
        {/*      return <img className={'image'} src={item.images.image} alt={''}/>*/}
        {/*    })}*/}
        {/*    <img src={pop} alt={''} className={'image'}/>*/}
        {/*  </Modal>*/}
        {/*)}*/}
      </div>
    </div>
  );
}

export default App;
