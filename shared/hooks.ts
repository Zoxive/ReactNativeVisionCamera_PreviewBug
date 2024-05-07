import { useCallback, useEffect } from "react";
import { BackHandler } from 'react-native';

export function useBackButtonListener(action: () => boolean, deps: unknown[] = []) {
    const backFunc = useCallback(action, deps);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backFunc);
        return () => backHandler.remove();
    }, [backFunc]);
}
