import { Stack } from 'expo-router';
import Header from '@/components/Courses/Header';

export default function CoursesLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <Header />,
      }}
    />
  );
}