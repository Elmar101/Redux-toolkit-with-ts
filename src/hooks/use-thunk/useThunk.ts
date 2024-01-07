import { AnyAction, AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../store";
import { useCallback, useState } from "react";

interface IRunThunkActionState {
    isLoading?: boolean;
    loadingError?: string | Record<string, string> | any;
};

type AsyncThunkConfig = {
    state?: unknown;
    dispatch?: Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}

export const useThunk = <T, D = string | void | undefined, Args = any>(thunk: (args?: Args) => AsyncThunkAction<T, D, AsyncThunkConfig>)
    : [(data?: any) => void, boolean | undefined, string | any] => {
    const [state, setState] = useState<IRunThunkActionState>({});
    const dispatch = useAppDispatch();

    const runThunk = useCallback((data?: any) => {
        setState(st => ({ ...st, isLoading: true }));
        dispatch(thunk(data))
            .unwrap()
            .catch(err => { setState(st => ({ ...st, loadingError: err })) })
            .finally(() => { setState(st => ({ ...st, isLoading: false })) })
    }, [dispatch, thunk]);

    return [runThunk, state.isLoading, state.loadingError]
};
