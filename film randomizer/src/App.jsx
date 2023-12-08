import { useState,useEffect } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Wheel } from 'react-custom-roulette'

function App() {
  const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}


  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [colorsForWheel,setColorsForWheel]=useState([]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }


  const data = [
    { option: 'Lotr',  },
    { option: 'Harry potter',  },
    { option: 'Avengers:Endgame',  },
    { option: 'The amazing spiderman 2',  },
    { option: 'Dr Strange',  },
    { option: 'The Godfather',  },
    { option: 'Fight Club',  },
    { option: 'Inception',  },
    { option: 'Interstallar',  },
    { option: 'Into the spiderverse',  },
  ]
  const colors=[]

  const genColors=()=>{
  for(let i=0;i<data.length;i++) {
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
        </div>
      </div>
    </>
  )
}

export default App
