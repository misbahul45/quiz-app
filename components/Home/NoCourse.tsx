import { View, Text, Image } from 'react-native'
import React from 'react'
import { homeStyles } from '@/styles/home.styles'
import Button from '../ui/Button'
import { useRouter } from 'expo-router'
import Colors from '@/constant/Colors'

const NoCourse = () => {
    const router=useRouter()
  return (
    <View style={homeStyles.noCourseContainer}>
      <Image source={require('@/assets/images/book.png')} style={homeStyles.noCourseBannerImage} />
      <Text style={homeStyles.noCourseText}>You Don&apos;t Have Any Course</Text>
      <Button onPress={() => router.push('/courses/create')}>
        <Text style={{ color:'#fff', fontSize:20 }}>+ create New Courses</Text>
      </Button>
      <View style={{ marginTop:10, marginBottom:10 }} />
      <Button variant='outline' onPress={()=>{}}>
        <Text style={{ color: Colors.primary, fontSize:20 }}>Browse Courses</Text>
      </Button>
    </View>
  )
}

export default NoCourse