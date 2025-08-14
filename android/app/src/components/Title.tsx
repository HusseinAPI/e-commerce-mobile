/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

export default function VoltiqueTitle() {
  const shimmerAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 100,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    <View style={{ position: 'relative' }}>
      {/* Always visible green text */}
      <Text style={styles.baseText}>Voltique</Text>

      {/* Flash effect layer */}
      <MaskedView
        style={styles.maskView}
        maskElement={<Text style={styles.baseText}>Voltique</Text>}
      >
        <Animated.View
          style={{
            transform: [{ translateX: shimmerAnim }],
          }}
        >
          <LinearGradient
            colors={['transparent', 'white', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: 110, height: 40 }}
          />
        </Animated.View>
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 22,
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: 1,
    marginLeft: 5,
    color: '#a6aa53ff',
  },
  maskView: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
