import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Vibration,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';

const App = () => {
  const [isPro, setIsPro] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [friends] = useState([
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Jordan' },
    { id: 3, name: 'Casey' },
    { id: 4, name: 'Morgan' },
  ]);

  // Animated pulse values for each friend
  const pulseAnims = useRef(
    friends.reduce((acc, friend) => {
      acc[friend.id] = new Animated.Value(1);
      return acc;
    }, {})
  ).current;

  const handleVibeCheck = (friendId) => {
    // Trigger haptic feedback
    Vibration.vibrate([0, 100, 100, 100], false);

    // Trigger color pulse animation
    const animation = Animated.sequence([
      Animated.timing(pulseAnims[friendId], {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(pulseAnims[friendId], {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]);

    animation.start();
  };

  const handleBroadcast = () => {
    if (!isBroadcasting) {
      Vibration.vibrate([0, 150, 50, 150], false);
    } else {
      Vibration.vibrate(50);
    }
    setIsBroadcasting(!isBroadcasting);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>NUDGE</Text>
        <Text style={styles.subtitle}>Low-friction social</Text>
      </View>

      {/* Pro Mode Toggle */}
      <View style={styles.preModeContainer}>
        <Text style={styles.proModeLabel}>Pro Mode</Text>
        <Switch
          value={isPro}
          onValueChange={setIsPro}
          thumbColor={isPro ? '#00ffff' : '#666'}
          trackColor={{ false: '#333', true: '#00ffff30' }}
          style={styles.switch}
        />
      </View>

      {/* Free Tier Dashboard */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Free Tier</Text>
        <Text style={styles.sectionSubtitle}>Send Vibe Checks</Text>

        <View style={styles.gridContainer}>
          {friends.map((friend) => (
            <Animated.View
              key={friend.id}
              style={[
                styles.avatarWrapper,
                {
                  transform: [
                    {
                      scale: pulseAnims[friend.id],
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.avatar}
                onPress={() => handleVibeCheck(friend.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.avatarText}>{friend.name[0]}</Text>
              </TouchableOpacity>
              <Text style={styles.friendName}>{friend.name}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Pro Mode: Bat Signal */}
      {isPro && (
        <View style={[styles.section, styles.proSection]}>
          <Text style={styles.sectionTitle}>Bat Signal</Text>
          <Text style={styles.sectionSubtitle}>Broadcast "I am Free"</Text>

          <TouchableOpacity
            style={[
              styles.batSignalButton,
              isBroadcasting && styles.batSignalButtonActive,
            ]}
            onPress={handleBroadcast}
          >
            <View
              style={[
                styles.batSignalInner,
                isBroadcasting && styles.batSignalInnerActive,
              ]}
            >
              <Text style={styles.batSignalText}>
                {isBroadcasting ? '⚡ BROADCASTING' : '◌ GO LIVE'}
              </Text>
            </View>
          </TouchableOpacity>

          {isBroadcasting && (
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Your friends know you're free</Text>
            </View>
          )}
        </View>
      )}

      {/* Footer spacing */}
      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#00ffff',
    letterSpacing: 4,
    textShadowColor: '#00ffff80',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    letterSpacing: 1,
  },
  preModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
  proModeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00ffff',
    marginBottom: 4,
    letterSpacing: 2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 30,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00ffff80',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#00ffff',
  },
  friendName: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#aaa',
    letterSpacing: 0.5,
  },
  proSection: {
    backgroundColor: '#1a0a1a',
    borderWidth: 1,
    borderColor: '#ff00ff40',
    borderRadius: 12,
    padding: 24,
  },
  batSignalButton: {
    height: 80,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00ffff40',
    marginBottom: 20,
  },
  batSignalButtonActive: {
    borderColor: '#ff00ff',
    backgroundColor: '#ff00ff15',
  },
  batSignalInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  batSignalInnerActive: {
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  batSignalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00ffff',
    letterSpacing: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff00ff20',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff00ff',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff00ff',
    marginRight: 12,
  },
  statusText: {
    fontSize: 13,
    color: '#ff00ff',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footer: {
    height: 40,
  },
});

export default App;
