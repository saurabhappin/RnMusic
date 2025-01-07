import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import TrackPlayer, {State} from 'react-native-track-player';
import {
  DownIcon,
  NextIcon,
  OptionsIcon,
  PauseIcon,
  PlayIcon,
  PreviousIcon,
} from '../assets/svgs';
import {Colors} from '../assets/colors';
const backgroundImage = require('../assets/images/playerbg.png');

const Player = ({
  SampleSongs,
  songIndex,
  isVisible,
  setIsVisible,
  progress,
  playState,
  setSongIndex,
}) => {
  const format = seconds => {
    // eslint-disable-next-line radix
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.bg}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.mainContainer}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <DownIcon height={30} width={30} fill={Colors.white} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                  PLAYING FROM PLAYLIST{'\n'}
                  <Text style={styles.headerSubText}>Chill-time Playlist</Text>
                </Text>
                <OptionsIcon height={30} width={30} fill={Colors.white} />
              </View>
              <Image
                source={{uri: SampleSongs[songIndex].artwork}}
                style={styles.imageStyle}
              />
              <Text style={styles.title}>{SampleSongs[songIndex].title}</Text>
              <Text style={styles.artist}>{SampleSongs[songIndex].artist}</Text>
              <Slider
                style={styles.sliderStyle}
                minimumValue={0}
                value={progress.position}
                maximumValue={progress.duration}
                minimumTrackTintColor={Colors.white}
                maximumTrackTintColor={Colors.playerBar}
                tapToSeek={true}
                onValueChange={async value => {
                  await TrackPlayer.seekTo(value);
                  console.log(value);
                }}
              />
              <View style={styles.timeStamps}>
                <Text style={styles.timeStampText}>
                  {format(progress.position)}
                </Text>
                <Text style={styles.timeStampText}>
                  {format(progress.duration)}
                </Text>
              </View>
              <View style={styles.mediaControls}>
                <TouchableOpacity
                  onPress={async () => {
                    await TrackPlayer.skip(songIndex - 1);
                    await TrackPlayer.play();
                    setSongIndex(songIndex - 1);
                  }}>
                  <PreviousIcon height={35} width={35} fill={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    if (State.Playing === playState) {
                      await TrackPlayer.pause();
                    } else {
                      await TrackPlayer.skip(songIndex);
                      await TrackPlayer.play();
                    }
                  }}>
                  {State.Playing === playState ? (
                    <PauseIcon height={60} width={60} fill={Colors.white} />
                  ) : (
                    <PlayIcon height={60} width={60} fill={Colors.white} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    await TrackPlayer.skip(songIndex + 1);
                    await TrackPlayer.play();
                    setSongIndex(songIndex + 1);
                  }}>
                  <NextIcon height={35} width={35} fill={Colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '100%',
    margin: 0,
  },
  bg: {
    flex: 1,
  },
  mainContainer: {
    padding: '5%',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  headerText: {
    color: Colors.white,
    letterSpacing: 1,
    fontSize: 10,
    textAlign: 'center',
  },
  headerSubText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  imageStyle: {
    height:
      Dimensions.get('window').height < 700
        ? Dimensions.get('window').height * 0.46
        : Dimensions.get('window').height * 0.4,
    width: '95%',
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 5,
  },
  title: {
    marginTop: 20,
    marginLeft: '3%',
    color: Colors.white,
    fontSize: 26,
    fontWeight: '500',
  },
  artist: {
    marginLeft: '3%',
    color: Colors.dullWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  sliderStyle: {
    marginTop: '6%',
    width: '95%',
    height: 40,
    alignSelf: 'center',
  },
  timeStamps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
  },
  timeStampText: {
    color: Colors.dullWhite,
    fontWeight: '700',
    fontSize: 12,
  },
  mediaControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Player;
