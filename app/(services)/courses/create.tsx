import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constant/Colors'
import { generateCourseTopics } from '@/config/aiGemini'
import Button from '@/components/ui/Button'

  type GeneratedTopics = {
    course_title: string;
    topics: string[];
  };

const CreateCourse = () => {
  const [courseInput, setCourseInput] = useState({
    text: '',
    isLoading: false
  })

  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  
  const [generatedTopics, setGeneratedTopics] = useState<GeneratedTopics | null>(null)

  const generateTopic = async () => {
    if (!courseInput.text.trim()) return
    setGeneratedTopics(null)
    setCourseInput({ text: courseInput.text, isLoading: true })
    try {
      const topics = await generateCourseTopics(courseInput.text)

      console.log(topics)
      setGeneratedTopics(topics)
    } catch (error) {
      console.error('Error generating topics:', error)

    } finally {
      setCourseInput(prev => ({ ...prev, isLoading: false }))
    }
  }


  const handleSelectedTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(prev => prev.filter(t => t !== topic))
    } else {
      setSelectedTopics(prev => [...prev, topic])
    }
  }

  const generateCourses=()=>{}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>What do you want to learn today?</Text>
            <Text style={styles.description}>
              Enter the course topic you&apos;d like to create
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.inputStyle, courseInput.text.length > 0 && styles.activeInputStyle]}
              placeholder='e.g. Learn Python, Node.js, React Native...'
              placeholderTextColor={Colors.text + '60'}
              multiline={true}
              numberOfLines={4}
              value={courseInput.text}
              onChangeText={text => setCourseInput({ text, isLoading: courseInput.isLoading })}
              editable={!courseInput.isLoading}
            />
          </View>
          <Button onPress={generateTopic} variant='outline' disabled={courseInput.isLoading || courseInput.text.length === 0}>
              {courseInput.isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.buttonText}>Generating...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Generate Topics</Text>
              )}
          </Button>

          {generatedTopics ? (
            <View style={styles.resultsContainer}>
              <View style={styles.topicsList}>
                {generatedTopics.topics.map((topic, index) => (
                  <TouchableOpacity key={index} onPress={() => handleSelectedTopic(topic)} style={[styles.topicItem, selectedTopics.includes(topic) && styles.selectedTopic]}>
                    <Text style={styles.topicText}>{topic}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Button onPress={generateCourses} disabled={!selectedTopics.length}>
                  {courseInput.isLoading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="small" color="#FFFFFF" />
                      <Text style={[styles.buttonText, { color:'#fff' }]}>Creating...</Text>
                    </View>
                  ) : (
                    <Text style={[styles.buttonText, { color:'#fff' }]}>Create Course</Text>
                  )}
              </Button>
            </View>
          ) : (
            <View style={styles.suggestionContainer}>
              <Text style={styles.sectionTitle}>Popular Topics</Text>
              <View style={styles.chipContainer}>
                {['Python', 'JavaScript', 'React Native', 'Data Science', 'Machine Learning', 'Web Development'].map((topic, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.chip, courseInput.isLoading && styles.disabledChip]}
                    onPress={() => !courseInput.isLoading && setCourseInput({ text: topic, isLoading: false })}
                    disabled={courseInput.isLoading}
                  >
                    <Text style={[styles.chipText, courseInput.isLoading && styles.disabledChipText]}>{topic}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}



        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    color: Colors.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'outfit-regular',
    color: Colors.text,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputStyle: {
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary + '30',
    borderRadius: 16,
    minHeight: 120,
    maxHeight: 180,
    textAlignVertical: 'top',
    fontFamily: 'outfit-regular',
    fontSize: 16,
    backgroundColor: Colors.background,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeInputStyle: {
    borderColor: Colors.primary,
    shadowOpacity: 0.2,
  },
  buttonStyle: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  inactiveButton: {
    backgroundColor: Colors.primary + '90',
  },
  loadingButton: {
    backgroundColor: Colors.primary,
    opacity: 0.9,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    marginLeft: 8,
  },
  suggestionContainer: {
    paddingTop: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    color: Colors.text,
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary + '15',
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  chipText: {
    fontFamily: 'outfit-medium',
    color: Colors.primary,
    fontSize: 14,
  },
  disabledChip: {
    backgroundColor: Colors.primary + '10',
    borderColor: Colors.primary + '20',
    opacity: 0.6,
  },
  disabledChipText: {
    opacity: 0.6,
  },
  resultsContainer: {
    backgroundColor: Colors.background,
    padding: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  topicsList: {
    gap: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom:16
  },
  topicItem: {
    borderWidth: 1,
    borderColor: Colors.primary + '20',
    backgroundColor: Colors.primary + '10',
    borderRadius: 12,
    padding: 12,
  },
  selectedTopic: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '30',
  },
  topicText: {
    flex: 1,
    fontFamily: 'outfit-regular',
    fontSize: 16,
    color: Colors.text,
  }
})

export default CreateCourse