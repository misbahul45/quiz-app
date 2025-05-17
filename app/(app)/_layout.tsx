import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useMiddleware } from '@/hooks/useMiddleware'

const Layout = () => {
    useMiddleware()
  return (
    <Tabs
    >
        <Tabs.Screen
            name="home"
            options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
                tabBarLabel:'Home'
            }}
        />
           <Tabs.Screen
           name='explore'
           options={{
                headerShown:false,
               tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
               tabBarLabel:'Explore'
           }}
        />
        <Tabs.Screen
            name='progress'
            options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" color={color} size={size} />,
                tabBarLabel:'Progress'
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                headerShown:false,
                tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
                tabBarLabel:'Profile'
            }}
        />
    </Tabs>
  )
}

export default Layout