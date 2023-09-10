import { useEffect, useState } from 'react';

export function usePersistentState<T>(init: T, name: string) {
    const [state, setState] = useState<T | null>(null);

    function setPersistentValue(val: T) {
        const stringified = JSON.stringify(val);

        localStorage.setItem(name, stringified);
        setState(val);
    }

    useEffect(() => {
        const isExist = localStorage.getItem(name);

        if (isExist) {
            const parsed = JSON.parse(isExist);
            setState(parsed);
        } else {
            setState(init);
        }
    }, [name, init]);

    return { state, setPersistentValue };
}
