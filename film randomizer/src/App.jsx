import { useState, useEffect } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { db } from './config'
import { collection, doc, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import { Wheel } from 'react-custom-roulette'

function App() {

  const [films, setFilms] = useState([])
  const [film, setFilm] = useState({
    option: "",
  })
  const [deletefilm, setdeleteFilm] = useState({
    deleteOption: "",
  })

  const filmsCollectionRef = collection(db, "Films")



  const createFilm = async () => {
    if (!film.option == "") {
      await addDoc(filmsCollectionRef, film).then(()=>{window.location.reload()})
    }
  }
  const removeFilm = async (name) => {
    if (!deletefilm.deleteOption == "") {
      const data = await getDocs(filmsCollectionRef)
      for (let i = 0; i < data.docs.length; i++) {
        if (data.docs[i].data().option == name) {
          console.log("deleting")
          const filmDoc = doc(db, "Films", data.docs[i].id)
          await deleteDoc(filmDoc).then(()=>{window.location.reload()})
        }
      }
    }
  }

  useEffect(() => {
    const getFilms = async () => {
      const data = await getDocs(filmsCollectionRef)
      setFilms(data.docs.map((doc) => ({ ...doc.data() })));
    }

    getFilms()
  }, [])


  const randColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
  }


  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [colorsForWheel, setColorsForWheel] = useState([]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setFilm({ ...film, [e.target.name]: value })
    console.log(film.option);

  }
  const handleDelChange = (e) => {
    const value = e.target.value
    setdeleteFilm({ ...deletefilm, [e.target.name]: value })
    console.log(deletefilm.deleteOption);

  }

  const data = [
    { option: 'Lotr', },
    { option: 'Harry potter', },
    { option: 'Avengers:Endgame', },
    { option: 'The amazing spiderman 2', },
    { option: 'Dr Strange', },
    { option: 'The Godfather', },
    { option: 'Fight Club', },
    { option: 'Inception', },
    { option: 'Interstallar', },
    { option: 'Into the spiderverse', },
  ]
  const colors = []

  const genColors = () => {
    for (let i = 0; i < data.length; i++) {
      colors.push(randColor())
    }
    return colors
  }


  useEffect(() => {
    setColorsForWheel(genColors())
  }, []);



  return (
    <>

      <div className=' m-auto w-fit py-8 text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' >
        <h1>Movie picker</h1>
      </div>
      <div className='flex justify-center items-center mb-6'>
        <label className="font-semibold text-xl">Film name:</label>
        <input onChange={(e) => handleChange(e)} className="border-[2px] border-gray-900 rounded-md p-2 mx-4" type="text" id="option" name="option" placeholder="Interstellar" value={film.option} />
        <button onClick={createFilm} className=' text-white rounded-xl bg-green-600 w-36 h-14'>Add</button>
      </div>
      <div className='flex justify-center items-center mb-6'>
        <label className="font-semibold text-xl">Reomve film:</label>
        <input onChange={(e) => handleDelChange(e)} className="border-[2px] border-gray-900 rounded-md p-2 mx-4" type="text" id="deleteOption" name="deleteOption" placeholder="Interstellar" value={deletefilm.deleteOption} />
        <button onClick={() => removeFilm(deletefilm.deleteOption)} className=' text-white rounded-xl bg-red-600 w-36 h-14'>Del</button>
      </div>
      <div className='flex items-center justify-center'>
        <div className='border-2 border-black rounded-xl'>
          <div className='my-10 mx-40 h-[650px] w-[650px] [&>div]:max-h-none [&>div]:max-w-none [&>div]:h-full [&>div]:w-full'>
            <Wheel
              fontSize={15}
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={colorsForWheel}
              innerRadius={10}
              radiusLineWidth={10}
              fontFamily="Poppins"
              spinDuration={0.1}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
              fontWeight={500}
            />
          </div>
          <div className='items-center justify-center flex mb-10'>
            <button className='border-[3px] border-black rounded-xl bg-blue-500 w-40 h-16' onClick={handleSpinClick}>SPIN</button>
          </div>
          {films.map((film, index) => (
            <h1 key={index}>{film.option} </h1>
          ))}
        </div>
      </div>

    </>
  )
}

export default App
