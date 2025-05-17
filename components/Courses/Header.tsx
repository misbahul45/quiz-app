import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { usePathname, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constant/Colors'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  
  const shouldShowHeader = () => {
    return (
      pathname.includes('/courses/create') ||
      pathname.includes('/courses/update') ||
      (pathname.includes('/courses/') && pathname !== '/courses')
    )
  }

  const getTitle = () => {
    if (pathname.includes('/courses/create')) {
      return 'Create Course'
    } else if (pathname.includes('/courses/update')) {
      return 'Update Course'
    } else if (pathname.includes('/courses/')) {
      return 'Course Detail'
    }
    return ''
  }

  const handleBack = () => {
    router.back()
  }

  if (!shouldShowHeader()) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.title}>{getTitle()}</Text>
        
        {/* Placeholder to ensure title stays centered */}
        <View style={styles.placeholder} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.border,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
})

export default Header