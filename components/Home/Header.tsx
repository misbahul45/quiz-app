import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { homeStyles } from '@/styles/home.styles'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constant/Colors'

const Header = () => {
    const user=useAuthStore((state)=>state.user)
  return (
    <View style={homeStyles.header}>
      <View>
        <Text style={homeStyles.textTitle}>Hello, {user?.username}</Text>
        <Text style={homeStyles.textSubTitle}>
          Let&apos;s get started
        </Text>
      </View>

      <TouchableOpacity style={homeStyles.settings}>
        <Ionicons name='settings-outline' size={35} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  )
}

export default Header