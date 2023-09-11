'use client';

import { useEffect, useState } from 'react';

// export function usePersistentState<T>(init: T, name: string) {
//   const [state, setState] = useState<T | null>(null);

//   function setPersistentValue(val: T) {
//     const stringified = JSON.stringify(val);

//     localStorage.setItem(name, stringified);
//     setState(val);
//   }

//   useEffect(() => {
//     const isExist = localStorage.getItem(name);

//     if (isExist) {
//       const parsed = JSON.parse(isExist);
//       setState(parsed);
//     } else {
//       setState(init);
//     }
//   }, [name, init]);

//   return { state, setPersistentValue };
// }

export function usePersistentState<T>(init: T, key: string) {
    const storedValue = (() => {
        if (typeof window !== 'undefined') return localStorage.getItem(key);
    })();
    const initial = storedValue ? JSON.parse(storedValue) : init;

    const [state, setPersistentValue] = useState<T>(initial);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return { state, setPersistentValue };
}

export default usePersistentState;
