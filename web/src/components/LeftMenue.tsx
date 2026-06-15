import React, { Component } from 'react'
import { MdOutlineHome } from "react-icons/md";
import { IoMdClock } from "react-icons/io";
import { MdDataThresholding } from "react-icons/md";

type Props = {}

type State = {}

export default class LeftMenue extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className=' flex flex-col gap-7 px-[2rem]  w-[15rem] pt-10 border-r border-r-white ' >
        <button className=' flex flex-row text-white gap-4 place-items-center hover:cursor-pointer hover:text-zinc-400 active:text-zinc-600 ' ><MdOutlineHome size={26} />Overview</button>
        <button className=' flex flex-row text-white gap-4 place-items-center hover:cursor-pointer hover:text-zinc-400 active:text-zinc-600 ' ><IoMdClock size={26} /> Segments</button>
        <button className=' flex flex-row text-white gap-4 place-items-center hover:cursor-pointer hover:text-zinc-400 active:text-zinc-600 ' ><MdDataThresholding size={26} />Data Sources</button>
      </div>
    )
  }
}