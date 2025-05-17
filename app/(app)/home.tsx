import { SafeAreaView} from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header'
import { homeStyles } from '@/styles/home.styles'
import NoCourse from '@/components/Home/NoCourse'

const home = () => {
  return (
    <SafeAreaView style={homeStyles.container}>
       <Header />
       <NoCourse />
    </SafeAreaView>
  )
}

export default home

