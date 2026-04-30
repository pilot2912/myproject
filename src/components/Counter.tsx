import { useState } from 'react'

interface CounterProps {
  count: number
  onIncrement: () => void
  onDecrement: () => void
  onIncrementByAmount: (amount: number) => void
}

const Counter = ({ count, onIncrement, onDecrement, onIncrementByAmount }: CounterProps) => {
  const [amount, setAmount] = useState<number>(0)

  const handleIncrementByAmount = () => {
    if (amount !== 0) {
      onIncrementByAmount(amount)
      setAmount(0)
    }
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Current Count: {count}</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={onIncrement} style={{ marginRight: '1rem' }}>
          Increment (+1)
        </button>
        <button onClick={onDecrement}>
          Decrement (-1)
        </button>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button onClick={handleIncrementByAmount}>
          Add Amount
        </button>
      </div>
    </div>
  )
}

export default Counter
