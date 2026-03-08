import React, { useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
import { onboardingData } from '../../data/onboardingData';
import Button, {btnStyles} from '../../components/Button';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex + 1 < onboardingData.length ? currentIndex + 1 : 0;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {/* Pagination dots*/}
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? COLORS.primaryGreen : COLORS.grayLight },
            ]}
          />
        ))}
      </View>
    </View>
  );

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index);
  };

  return (
    <View style={styles.container}>
      {/* Language Button */}
      <TouchableOpacity style={styles.langBtn}>
        <Text style={styles.langText}>English</Text>
      </TouchableOpacity>

      {/* Onboarding carousel */}
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        contentContainerStyle={{ paddingTop: 60, paddingBottom: 120 }}
      />

      {/* Login / Signup */}
      <View style={styles.authContainer}>
        <Button
          title="Login"
          style={btnStyles.primaryBtn}
          onPress={() => navigation.navigate('Login')}
        />
        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  itemContainer: {
    width,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingTop:30,
  },
  image: {
    width: '100%',
    height: '50%',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  authContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    padding:25,
  },
  signupText: {
    paddingTop:8,
    textAlign:'center',
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  signupLink: {
    color: COLORS.primaryGreen,
    fontWeight: '500',
  },
  langBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width:'30%',
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems:'center'
  },
  langText: {
    color: COLORS.grayLight,
    fontWeight: '500',
    fontSize: 14,
  },
});