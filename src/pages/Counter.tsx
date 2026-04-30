import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { increment, decrement, incrementByAmount } from '../store/counterSlice'
import CounterComponent from '../components/Counter'

const CounterPage = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <h1>Counter with Redux Toolkit</h1>
      <p>This example demonstrates Redux Toolkit in action.</p>
      
      <CounterComponent 
        count={count}
        onIncrement={() => dispatch(increment())}
        onDecrement={() => dispatch(decrement())}
        onIncrementByAmount={(amount: number) => dispatch(incrementByAmount(amount))}
      />
    </div>
  )
}

export default CounterPage
