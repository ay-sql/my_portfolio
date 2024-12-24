import * as React from "react"
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"
import { useReducer } from 'react'

enum ActionType {
  ADD_TOAST = 'ADD_TOAST',
  REMOVE_TOAST = 'REMOVE_TOAST',
  UPDATE_TOAST = 'UPDATE_TOAST',
  DISMISS_TOAST = 'DISMISS_TOAST',
}

type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  type?: 'success' | 'error' | 'warning' | 'info'
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: 'default' | 'destructive';
}

type State = {
  toasts: Toast[]
}

type Action =
  | { type: ActionType.ADD_TOAST; toast: Omit<Toast, 'id'> }
  | { type: ActionType.REMOVE_TOAST; toastId: string }
  | { type: ActionType.UPDATE_TOAST; toast: Partial<Toast>; id: string }
  | { type: ActionType.DISMISS_TOAST; toastId?: string }

const initialState: State = {
  toasts: [],
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const toastReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, { ...action.toast, id: String(Date.now()) }],
      };
    case ActionType.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.toastId),
      };
    case ActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.id ? { ...toast, ...action.toast } : toast
        ),
      };
    case ActionType.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId ? { ...t, open: false } : t
        ),
      };
    default:
      return state;
  }
}

const addToRemoveQueue = (toastId: string, dispatch: React.Dispatch<Action>) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

export function useToast() {
  const [state, dispatch] = React.useReducer(toastReducer, initialState)

  const toast = (toast: Omit<Toast, 'id'> & { variant: 'default' | 'destructive' }) => {
    const id = String(Date.now())

    const update = (props: Toast) =>
      dispatch({
        type: ActionType.UPDATE_TOAST,
        toast: props,
        id,
      })

    const dismiss = () => dispatch({ type: ActionType.DISMISS_TOAST, toastId: id })

    dispatch({
      type: ActionType.ADD_TOAST,
      toast: {
        ...toast,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss()
        },
      },
    })

    return {
      id: id,
      dismiss,
      update,
    }
  }

  const dismiss = (toastId?: string) => {
    if (toastId) {
      addToRemoveQueue(toastId, dispatch)
    } else {
      state.toasts.forEach((toast) => {
        addToRemoveQueue(toast.id, dispatch)
      })
    }
    dispatch({ type: ActionType.DISMISS_TOAST, toastId })
  }

  const update = (toast: Toast) => {
    dispatch({ type: ActionType.UPDATE_TOAST, toast, id: toast.id })
  }

  return {
    toasts: state.toasts,
    toast,
    dismiss,
    update,
  }
}
