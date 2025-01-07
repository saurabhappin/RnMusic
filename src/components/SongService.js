import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  try {
    TrackPlayer.addEventListener(TrackPlayer.Events.RemotePlay, () => {
      TrackPlayer.play();
    });

    TrackPlayer.addEventListener(TrackPlayer.Events.RemotePause, () => {
      TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(TrackPlayer.Events.RemoteNext, () => {
      TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(TrackPlayer.Events.RemotePrevious, () => {
      TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener(TrackPlayer.Events.RemoteStop, () => {
      TrackPlayer.reset(); 
    });

    TrackPlayer.addEventListener(TrackPlayer.Events.RemoteSeek, (position) => {
      TrackPlayer.seekTo(position); 
    });

    TrackPlayer.addEventListener(TrackPlayer.Events.PlaybackState, (state) => {
      console.log('Playback state:', state);
    });

    TrackPlayer.addEventListener(TrackPlayer.Events.PlaybackError, (error) => {
      console.error('Playback error:', error);
    });

  } catch (error) {
    console.error('Error setting up TrackPlayer:', error);
  }
};
