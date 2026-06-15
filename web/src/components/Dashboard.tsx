import React, { Component } from 'react'
import LeftMenue from './LeftMenue'
import Overview from './Overview'

type Props = {}

type State = {}

export default class Dashboard extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className=" w-full h-auto min-h-[100vh] flex flex-row  ">
        <LeftMenue />
        <Overview />
    </div>
    )
  }
}