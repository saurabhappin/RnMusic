import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import {
  LeftIcon,
  MusicIcon,
  PauseIcon,
  PlayIcon,
  SearchIcon,
  ShuffleIcon,
  WhitePauseIcon,
  WhitePlayIcon,
} from '../assets/svgs';
import {Colors} from '../assets/colors';
import {SampleSongs} from '../assets/songs/SampleSongs';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import LottieView from 'lottie-react-native';
import Player from './Player';

const backgroundImage = require('../assets/images/ScreenBG.png');

const Playlist = ({navigation}) => {
  const [songIndex, setSongIndex] = useState(0);
  const playState = usePlaybackState();
  const progress = useProgress();
  const [isVisible, setIsVisible] = useState(false);
  const [isPlayerBarVisible, setIsPlayerBarVisible] = useState(false);

  let config = {
    method: 'get',
    maxBodyLength: 2,
    url: 'https://api.spotify.com/v1/playlists/4n0MZ8Kix8frGO3C1LF1gX?market=IN',
    headers: {
      Authorization:
        'Bearer BQDvQK5kPz1LBl2TW7HiRj3fxQOjzSCTBgrASuI9P2tn5ZFEtRpTczfr_rioJXqTHAZyhAjcY8aTjSZuNmY8U8QeoR77dY4gX4eiQ09ebvUJnWq8r-w',
    },
  };

  useEffect(() => {
    axios
      .request(config)
      .then(response => {
        console.log('newwwwwwwwwwwwwwwwwww');
        console.log(JSON.stringify(response.data.tracks.items));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (State.Playing === playState) {
      setIsPlayerBarVisible(true);
    }
  }, []);

  useEffect(() => {
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        // for controlling media
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.SeekTo,
        ],

        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add(SampleSongs);
    } catch (e) {}
  };
  useEffect(() => {
    if (State.Playing === playState) {
      if (progress.position.toFixed(0) === progress.duration.toFixed(0)) {
        if (songIndex < SampleSongs.length) {
          setSongIndex(songIndex + 1);
        }
      }
    }
  }, [progress]);
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.bg}>
      <SafeAreaView>
        <FlatList
          bounces={false}
          data={SampleSongs}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: isPlayerBarVisible ? '24%' : '12%'}}
          ListHeaderComponent={() => {
            return(
              <><TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <LeftIcon height={50} width={50} fill={'white'} />
              </TouchableOpacity><View style={styles.upperSearchBar}>
                  <SearchIcon height={20} width={20} fill={'white'} />
                  <TextInput
                    placeholder="Find in playlist"
                    placeholderTextColor={'white'}
                    style={styles.TextInput}
                    inpu />
                </View><Image
                  source={{ uri: SampleSongs[songIndex].artwork }}
                  style={styles.imageStyle} /><View style={styles.subContainer}>
                  <View style={styles.subContainerLeft}>
                    <MusicIcon fill={'white'} />
                    <Text style={styles.subHeading}>Chill-time Playlist</Text>
                  </View>
                  <View style={styles.subContainerRight}>
                    <TouchableOpacity>
                      <ShuffleIcon height={25} weight={25} fill={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={async () => {
                        setIsPlayerBarVisible(true);
                        if (State.Playing === playState) {
                          await TrackPlayer.pause();
                        } else {
                          await TrackPlayer.skip(songIndex);
                          await TrackPlayer.play();
                        }
                      } }>
                      {State.Playing === playState ? (
                        <PauseIcon height={50} weight={50} fill={'#4daf50'} />
                      ) : (
                        <PlayIcon height={50} weight={50} fill={'#4daf50'} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View></>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.listButton}
                onPress={async () => {
                  setIsPlayerBarVisible(true);
                  await TrackPlayer.pause();
                  await TrackPlayer.skip(index);
                  await TrackPlayer.play();
                  setSongIndex(index);
                }}>
                <View style={styles.songContainer}>
                  <Image
                    source={{uri: item.artwork}}
                    style={styles.listImage}
                  />
                  <View style={styles.songTextContainer}>
                    <View style={styles.songTextLeft}>
                      <Text
                        style={[
                          styles.songTitle,
                          {
                            color:
                              index === songIndex &&
                              State.Playing === playState
                                ? Colors.spotify
                                : Colors.white,
                          },
                        ]}>
                        {item.title}
                      </Text>
                      <Text style={styles.songAuthor}>{item.artist}</Text>
                    </View>
                    <View style={styles.songTextRight}>
                      {index === songIndex && State.Playing === playState && (
                        <LottieView
                          source={require('../assets/lottie/playback.json')}
                          autoPlay={true}
                          loop={true}
                          style={styles.playbackAnimation}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {isPlayerBarVisible && (
          <View style={styles.playerBarContainer}>
            <TouchableOpacity
              style={styles.playerBar}
              activeOpacity={1}
              onPress={() => setIsVisible(true)}>
              <View style={styles.playerBarLeft}>
                <Image
                  source={{uri: SampleSongs[songIndex].artwork}}
                  style={styles.playerBarImage}
                />
                <View style={styles.playerBarText}>
                  <Text style={styles.playerBarSongTitle}>
                    {SampleSongs[songIndex].title}
                  </Text>
                  <Text style={styles.playerBarSongAuthor}>
                    {SampleSongs[songIndex].artist}
                  </Text>
                </View>
              </View>
              <View style={styles.playerBarRight}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={async () => {
                    if (State.Playing === playState) {
                      await TrackPlayer.pause();
                    } else {
                      await TrackPlayer.skip(songIndex);
                      await TrackPlayer.play();
                    }
                  }}>
                  {State.Playing === playState ? (
                    <WhitePauseIcon
                      height={40}
                      width={42}
                      fill={Colors.white}
                    />
                  ) : (
                    <WhitePlayIcon height={40} width={40} fill={Colors.white} />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <Player
          SampleSongs={SampleSongs}
          songIndex={songIndex}
          setSongIndex={setSongIndex}
          isVisible={isVisible}
          progress={progress}
          playState={playState}
          setIsVisible={setIsVisible}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  upperSearchBar: {
    flexDirection: 'row',
    backgroundColor: Colors.searchBlack,
    marginHorizontal: '5%',
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  TextInput: {
    paddingHorizontal: 20,
    color: Colors.white,
    fontSize: 16,
  },
  imageStyle: {
    height:
      Dimensions.get('window').height < 700
        ? Dimensions.get('window').height * 0.5
        : Dimensions.get('window').height * 0.42,
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 5,
  },
  subHeading: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
    paddingLeft: 10,
    paddingTop: 5,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '7%',
    marginTop: '5%',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  subContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 3,
  },
  subContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1.5,
  },
  listButton: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  listImage: {
    height: 50,
    width: 50,
    borderRadius: 3,
  },
  songContainer: {
    flexDirection: 'row',
  },
  songTitle: {
    color: Colors.white,
    fontSize: 16,
    paddingLeft: 15,
    fontWeight: '700',
  },
  songAuthor: {
    color: Colors.dullWhite,
    fontSize: 14,
    paddingLeft: 15,
    fontWeight: '500',
  },
  songTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playbackAnimation: {
    height: 10,
    width: 10,
    alignSelf: 'baseline',
    marginTop: '50%',
    marginLeft: '10%',
  },
  songTextLeft: {
    justifyContent: 'center',
  },
  songTextRight: {
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  playerBarContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom:
      Dimensions.get('window').height < 700
        ? Dimensions.get('window').height * 0.09
        : Platform.OS === 'android'
        ? Dimensions.get('window').height * 0.09
        : Dimensions.get('window').height * 0.05,
  },
  playerBar: {
    flexDirection: 'row',
    position: 'absolute',
    width: '98%',
    height: 60,
    backgroundColor: Colors.playerBar,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '2%',
    marginBottom: 80,
  },
  playerBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerBarImage: {
    height: 45,
    width: 45,
    borderRadius: 3,
    alignSelf: 'center',
    marginLeft: '6%',
  },
  playerBarText: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  playerBarSongTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.white,
  },
  playerBarSongAuthor: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.dullWhite,
  },
  playerBarRight: {},
});
