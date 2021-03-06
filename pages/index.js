import React, { useState } from "react";
import Head from 'next/head'
import { ColorPicker } from '../components/ColorPicker'
import { Footer } from '../components/Footer'


export default function Home() {
  const [color, setColor] = useState("#ffffff");

  const handleChange = (color) => {
    setColor(color);
  }

  return (
    <div className="container">
      <Head>
        <title>Dario's Color Picker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h1>Color Picker</h1>
        <ColorPicker
          color={color}
          onChange={handleChange}
        />
      </main>
      <Footer/>
    </div>
  )
}
