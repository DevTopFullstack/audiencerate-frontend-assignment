import React, { Component } from 'react'
import { Outlet,Link, Links } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { GoPlus } from "react-icons/go";


type Props = {}

type State = {}

export default class Header extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className=' text-zinc-900 w-full h-auto min-h-[100vh] bg-zinc-700 ' >
         <nav className="bg-zinc-700 shadow h-[5rem] border-b-gray-50 border-b flex flex-row justify-start gap-7 place-items-center px-[3rem] ">
          <CgProfile color="#ffffff" size={34} />
         <Link to={"/createSegment"} > <button className=' w-[10rem] h-[4rem] place-content-center place-items-center rounded-md hover:shadow-sm flex flex-row gap-2 active:bg-blue-700 shadow-white hover:cursor-pointer bg-blue-400 '  ><GoPlus color='#000' size={24} />Create Segment</button></Link>
        </nav>
      <Outlet/>
      </div>
    )
  }
}