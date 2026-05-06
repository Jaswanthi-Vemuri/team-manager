import { createContext, useContext, useState } from 'react'

export const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null)

  const showToast = (msg) => {
    setMessage(msg)

    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {message && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#333',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  return useContext(ToastContext)
}