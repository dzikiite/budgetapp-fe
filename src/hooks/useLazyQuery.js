import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const useLazyQuery = (keyArg, fetchFn, options) => {
    const [enabled, setEnabled] = useState(false);

    const query = useQuery(keyArg, fetchFn, {
        ...(options || {}),
        enabled,
    });

    return [useCallback(() => setEnabled(true), []), query];
};
