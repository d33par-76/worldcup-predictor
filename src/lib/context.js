import { createContext, useContext } from 'react'

export const AppContext = createContext({ refreshKey: 0, triggerRefresh: () => {} })
export function useAppContext() { return useContext(AppContext) }
