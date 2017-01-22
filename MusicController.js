import { PureComponent, PropTypes } from 'react';
import { Platform } from 'react-native';
import MusicControl from 'react-native-music-control';
import type { Song } from './Player';

type DefaultProps = {
    enableStopControl: boolean;
    enableNextTrackControl: boolean;
    enablePreviousTrackControl: boolean;
    enableSkipForwardControl: boolean;
    enableSkipBackwardControl: boolean;
    skipForwardInterval: number;
    skipBackwardInterval: number;
    playing: boolean;
}

type Props = {
    song?: Song;
    enableStopControl: boolean;
    enableNextTrackControl: boolean;
    enablePreviousTrackControl: boolean;
    enableSkipForwardControl: boolean;
    enableSkipBackwardControl: boolean;
    skipForwardInterval: number;
    skipBackwardInterval: number;
    playing: boolean;
    onRequestPlay: Function;
    onRequestPause: Function;
    onRequestStop: Function;
    onRequestNextTrack: Function;
    onRequestPreviousTrack: Function;
    onRequestSkipForward: Function;
    onRequestSkipBackward: Function;
}

export default class MusicController extends PureComponent<DefaultProps, Props, void> {

  static propTypes = {
    song: PropTypes.shape({
      album: PropTypes.string,
      artist: PropTypes.string,
      artwork: PropTypes.string,
      color: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.string,
      duration: PropTypes.number,
      genre: PropTypes.string,
      rating: PropTypes.number,
      title: PropTypes.string,
    }),
    enableStopControl: PropTypes.bool,
    enableNextTrackControl: PropTypes.bool,
    enablePreviousTrackControl: PropTypes.bool,
    enableSkipForwardControl: PropTypes.bool,
    enableSkipBackwardControl: PropTypes.bool,
    skipForwardInterval: PropTypes.number,
    skipBackwardInterval: PropTypes.number,
    playing: PropTypes.bool,
    onRequestPlay: PropTypes.func,
    onRequestPause: PropTypes.func,
    onRequestStop: PropTypes.func,
    onRequestNextTrack: PropTypes.func,
    onRequestPreviousTrack: PropTypes.func,
    onRequestSkipForward: PropTypes.func,
    onRequestSkipBackward: PropTypes.func,
  }

  static defaultProps = {
    enableStopControl: false,
    enableNextTrackControl: true,
    enablePreviousTrackControl: true,
    enableSkipForwardControl: false,
    enableSkipBackwardControl: false,
    skipForwardInterval: 30,
    skipBackwardInterval: 15,
    playing: false,
  }

  componentDidMount() {
    const {
      onRequestPlay,
      onRequestPause,
      onRequestStop,
      onRequestNextTrack,
      onRequestPreviousTrack,
      onRequestSkipForward,
      onRequestSkipBackward,
    } = this.props;

    MusicControl.enableBackgroundMode(true);
    MusicControl.on('play', () => {
      if (onRequestPlay) onRequestPlay();
    });

    MusicControl.on('pause', () => {
      if (onRequestPause) onRequestPause();
    });

    MusicControl.on('stop', () => {
      if (onRequestStop) onRequestStop();
    });

    MusicControl.on('nextTrack', () => {
      if (onRequestNextTrack) onRequestNextTrack();
    });

    MusicControl.on('previousTrack', () => {
      if (onRequestPreviousTrack) onRequestPreviousTrack();
    });

        // MusicControl.on('seekForward', () => {});
        // MusicControl.on('seekBackward', () => {});

    // MusicControl.on('seek', (pos) => { alert(pos); }); // Android only (Seconds)
        // MusicControl.on('rate', (rating)=> {}); // Android only (Percentage)
        // MusicControl.on('togglePlayPause', () => {}); // iOS only

    MusicControl.on('skipForward', () => {
      if (onRequestSkipForward) onRequestSkipForward();
    }); // iOS only
    MusicControl.on('skipBackward', () => {
      if (onRequestSkipBackward) onRequestSkipBackward();
    }); // iOS only
  }

  render() {
    const {
      song,
      enableNextTrackControl,
      enablePreviousTrackControl,
      enableSkipBackwardControl,
      enableSkipForwardControl,
      enableStopControl,
      playing,
      skipBackwardInterval,
      skipForwardInterval,
    } = this.props;

    const {
      title = '',
      artwork = 'https=//yt3.ggpht.com/0v8T0CTAv8VPxA5lJtz-tqJe-tR-3VQc0ONhD6Az2RWjNRnwh5QQzPYz5I7wbYljU_tQjZ2ok2W59_v_=s900-nd-c-c0xffffffff-rj-k-no',
      artist = '',
      album = '',
      genre = '',
      duration = 0,
      description = '',
      // FIXME: Convert from string to hex number
      color = 0x444444,
      date = '1983-01-02T00:00:00Z',
      rating = 0,
    } = song;

    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', enableStopControl);
    MusicControl.enableControl('nextTrack', enableNextTrackControl);
    MusicControl.enableControl('previousTrack', enablePreviousTrackControl);
    MusicControl.enableControl('skipForward', enableSkipForwardControl, { interval: skipForwardInterval }); // iOS only
    MusicControl.enableControl('skipBackward', enableSkipBackwardControl, { interval: skipBackwardInterval }); // iOS only
    // MusicControl.enableControl('seekForward', true);
    // MusicControl.enableControl('seekBackward', true);

    MusicControl.setNowPlaying({
      title,
      artwork,
      artist,
      album,
      genre,
      duration,
      description,
      // FIXME: convert from string to hex values
      color,
      date,
      rating,
    });
    if (Platform.OS === 'android') {
      MusicControl.setPlayback({
        state: playing ? MusicControl.STATE_PLAYING : MusicControl.STATE_PAUSED, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
      });
    }
    return null;
  }
}
