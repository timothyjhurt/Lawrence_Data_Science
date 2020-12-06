import React from 'react';
import '../../App.css';
import {useSpring, useTransition, animated} from 'react-spring'
import './style.css'
import { useRef, useState, useEffect, useCallback } from 'react'
import { render } from 'react-dom'



export default function Products() {
  const props = useSpring({
    from: { left: '0%', top: '0%', width: '0%', height: '0%', background: 'lightgreen' },
    to: async next => {
      var loopender = 0;
      while (!loopender) {
        await next({ left: '0%', top: '0%', width: '100%', height: '100%', background: 'lightblue' })
        await next({ height: '50%', background: 'lightgreen' })
        await next({ width: '50%', left: '50%', background: 'lightgoldenrodyellow' })
        await next({ top: '0%', height: '100%', background: 'lightpink' })
        await next({ top: '50%', height: '50%', background: 'lightsalmon' })
        await next({ width: '100%', left: '0%', background: 'lightcoral' })
        await next({ width: '50%', background: 'lightseagreen' })
        await next({ top: '0%', height: '100%', background: 'lightskyblue' })
        await next({ width: '100%', background: 'lightslategrey' })
        
        loopender+=1;
      }
      
    },
  })
    
  return (

    <>
  <animated.div className="script-box" style={props} />

  </>
  );


}
// export default function Products() {
//   const ref = useRef([])
//   const [items, set] = useState([])
//   const transitions = useTransition(items, null, {
//     from: { opacity: 0, height: 0, innerHeight: 0, transform: 'perspective(600px) rotateX(0deg)', color: '#8fa5b6' },
//     enter: [
//       { opacity: 1, height: 80, innerHeight: 80 },
//       { transform: 'perspective(600px) rotateX(180deg)', color: '#28d79f' },
//       { transform: 'perspective(600px) rotateX(0deg)' },
//     ],
//     leave: [{ color: '#c23369' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
//     update: { color: '#28b4d7' },
//   })

//   const reset = useCallback(() => {
//     ref.current.map(clearTimeout)
//     ref.current = []
//     set([])
//     ref.current.push(setTimeout(() => set(['Apples', 'Oranges', 'Kiwis']), 2000))
//     ref.current.push(setTimeout(() => set(['Apples', 'Kiwis']), 5000))
//     ref.current.push(setTimeout(() => set(['Apples', 'Bananas', 'Kiwis']), 8000))
//   }, [])

//   useEffect(() => void reset(), [])

//   return (
//     <div>
//       {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
//         <animated.div className="transitions-item" key={key} style={rest} onClick={reset}>
//           <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
//         </animated.div>
//       ))}
//     </div>
//   )

// }
