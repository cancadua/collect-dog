import './App.css';
import {useEffect, useState} from "react";
import Modal from "./Modal";

function App() {

  const [list, setList] = useState()
  const [pop, setPop] = useState('');


  const newDog = async () => {
    await fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        const newBreed = data.message.split('/')[4]

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
    console.log(list)
  }, [list]);

  return (
    <div className="App">
      <div className="container">
        <button onClick={newDog}>
          Click to find new dog!
        </button>

        {pop && (
          <Modal closeModal={() => setPop('')}>
            <img src={pop} alt={''} className={'image'}/>
          </Modal>
        )}

        {/*<div>*/}
        {/*  list && {Object.keys(list).map((image) => {*/}
        {/*    return (*/}
        {/*          <img src={image.message} alt={''}/>*/}
        {/*    )})} : <div/>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default App;
