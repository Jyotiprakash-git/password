import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed,setIsNumberAllowed]=useState(false);
  const [isCharAllowed,setIsCharAllowed]=useState(false);
  const [passd,setPassd]=useState("");


  // useRef
  const passdRef = useRef(null);


  const passdgen = useCallback(() => {
    let password = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWWXYZ";
    if(isNumberAllowed) str +="0123456789"
    if(isCharAllowed) str +="!@#$%^&*()_+~`|}{[]:;?><,./-="
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length+1);
      password += str.charAt(char);
    }
    setPassd(password);
  }, [length, isNumberAllowed, isCharAllowed]);

  const copyToClipboard = useCallback(() => {
    passdRef.current?.select();
    // passdRef.current?.setSelectionRange(0, 2);
    window.navigator.clipboard.writeText(passd);
  }, [passd]);

  // useEffect(() => {
  //   passdgen();
  // }, [passdgen, length, isNumberAllowed, isCharAllowed]);

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-lg rounded-lg my-8 text-orange-500 bg-gray-800 p-4'>
      <div className='text-xl text-center text-white my-4'>Password Generator</div>
      <div className='flex w-full'>
        <input 
        type="text"

        value={passd} 
        placeholder='Your Password'
        readOnly 
        style={{width:"100%",padding:"8px",backgroundColor:"white"}}
        className='rounded-l-md text-gray-700 hover:shadow-lg hover:shadow-orange-500/70 transition-all duration-300 hover:scale-105 '
        ref={passdRef}
      />
      <button
      className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-r-md focus:outline-none focus:ring-1 focus:ring-grey-800 hover:scale-105 transition-all duration-300'
      onClick={copyToClipboard}
      >copy</button>
      </div>
      <button 
        onClick={passdgen}
        className='mt-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        Generate Password
      </button>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
            type="range"
            min="4"
            max="40"
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label htmlFor=''>Length: {length}</label>
        </div>
        <div>
          <input
          type="checkbox"
          name=""
          id="numInput"
          defaultChecked={isNumberAllowed}
          onChange={() =>setIsNumberAllowed((prev) => !prev)}
           />
           <label htmlFor=''>Number</label>
        </div>
        <div>
          <input
          type="checkbox"
          name=""
          id="charInput"
          defaultChecked={isCharAllowed}
          onChange={() =>setIsCharAllowed((prev) => !prev)}
           />
           <label htmlFor=''>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
