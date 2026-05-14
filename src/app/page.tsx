"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchGlobalData, fetchNextEkadashiData } from "../store/globalSlice"
import { AppDispatch } from "../store/store"
import Home from "../features/Home"

export default function Page() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchGlobalData())
    dispatch(fetchNextEkadashiData())
  }, [dispatch])

  return <Home />
}