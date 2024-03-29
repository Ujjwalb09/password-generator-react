import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");


  const passwordGenerator = useCallback(()=>{
          let pass = ""
          let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

          if(numberAllowed) str += "0123456789"
          if(characters) str += "!@#$%^&*-_+=[]{}~`"

          for(let i = 1; i <= length; i++){
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
          }

          setPassword(pass)
  }, [length, numberAllowed, characters, setPassword])

  const copyPassToClipboard = useCallback(()=>{
    passInputRef.current?.select()
    // passInputRef.current?.setSelectionRange(0,3) will only select value inside input from range of 0th char to 3rd char
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
     passwordGenerator();
  }, [passwordGenerator])

  const passInputRef = useRef();

  return (
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-center text-white my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" 
         value={password}
         className='outline-none w-full py-1 px-3'
         placeholder='password'
         readOnly
         ref={passInputRef}
        />
        <button onClick={copyPassToClipboard} className='bg-blue-700 hover:bg-blue-900 focus:bg-blue-900 text-white outline-none px-3 py-0.5 shrink-0 transition-colors duration-300 ease-in-out'>Copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
       <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}} />
        <label>Length:{length}</label>
       </div>
       <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={()=>{
          setNumberAllowed(prev => !prev)
        }} />
        <label htmlFor='numberInput'>Numbers</label>
       </div>
       <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={characters}
        id='characterInput'
        onChange={()=>{
          setCharacters(prev => !prev)
        }} />
        <label htmlFor='characterInput'>Character</label>
       </div>
      </div>
      </div>

  )
}

export default App
