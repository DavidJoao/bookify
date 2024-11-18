'use client'
import { navigate } from "./lib/navigate";
import { useEffect } from "react";

export default function Home() {

	useEffect(() => {
		navigate('/home')
	}, [])

  return (
    <div className="h-screen grid grid-cols-1 grid-rows-8">
    </div>
  );
}
