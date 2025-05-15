import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/store/useAuthStore'

const QuizPage = () => {
  const user = useAuthStore((state) => state.user);

  const signoutFunction=useAuthStore((state)=>state.signout);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* <Text style={{ fontSize: 16, marginBottom: 10 }}>{JSON.stringify(user, null, 2)}</Text> */}
      <Image 
        source={{ uri: user.avatar }} 
        style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "#ccc" }} 
      />
      <TouchableOpacity onPress={signoutFunction}><Text>Sign Out</Text></TouchableOpacity>
    </View>
  );
};

export default QuizPage;
