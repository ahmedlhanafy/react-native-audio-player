/* @flow */

import React, {
    PureComponent,
    PropTypes,
} from 'react';
import { Player as AudioPlayer } from 'react-native-audio-toolkit';
import MusicController from './MusicController';

export type Song = {
    album?: string;
    artist?: string;
    artwork?: string;
    color?: string;
    date?: string;
    description?: string;
    duration?: number;
    genre?: string;
    rating?: number;
    title?: string;
    url: string;
}

type Props = {
    index: number;
    playing: boolean;
    songs: Array<Song>;
    toggle?: () => void;
    updateProgress?: Function;
    updateProgressInterval: number;
    onRequestPlay?: Function;
    onRequestPause?: Function;
    onRequestNextTrack?: Function;
    onRequestPreviousTrack?: Function;
}

type DefaultProps = {
  index: number;
  updateProgressInterval: number;
};

export default class Player extends PureComponent<DefaultProps, Props, void> {

  static propTypes = {
    index: PropTypes.number,
    playing: PropTypes.bool,
    songs: PropTypes.arrayOf(PropTypes.shape({
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
      url: PropTypes.string.isRequired,
    })),
    toggle: PropTypes.func,
    updateProgress: PropTypes.func,
    updateProgressInterval: PropTypes.number,
    onRequestPlay: PropTypes.func,
    onRequestPause: PropTypes.func,
    onRequestNextTrack: PropTypes.func,
    onRequestPreviousTrack: PropTypes.func,
  }

  static defaultProps = {
    index: 0,
    updateProgressInterval: 1000,
  };

  componentDidMount() {
    const {
          index,
          songs,
          updateProgress,
          updateProgressInterval,
      } = this.props;

    if (songs) {
      this.player = new AudioPlayer(songs[index].url);
    }

    if (updateProgress) {
      setInterval(() => {
        if (this.player && this.props.playing) {
          const currentTime = this.player.currentTime;
          const duration = this.player.duration;
          updateProgress({
            currentTime: Math.max(0, currentTime),
            duration: Math.max(0, duration),
          });
        }
      }, updateProgressInterval);
    }

  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.player && nextProps.playing !== this.props.playing) {
      if (nextProps.playing) {
        this.player.play();
      } else {
        this.player.pause();
      }
    }
  }

  componentWillUpdate(nextProps: Props) {
    const {
      index,
      songs,
    } = this.props;
    const {
      index: nextIndex,
      playing: nextPlaying,
      songs: nextSongs,
    } = nextProps;
    if ((!songs && nextSongs) ||
        (this.indexInBounds(songs, nextIndex) && this.indexInBounds(nextSongs, nextIndex) &&
        songs && nextSongs && songs[nextIndex].url !== nextSongs[nextIndex].url)) {
      if (this.player) {
        this.player.destroy();
      }
      this.player = new AudioPlayer(nextSongs[nextIndex].url);
    }
    if (index !== nextIndex && this.indexInBounds(nextSongs, nextIndex)) {
      if (this.player) {
        this.player.destroy();
      }
      this.player = new AudioPlayer(nextSongs[nextIndex].url);
      if (nextPlaying) {
        this.player.play();
      }
    }
  }

  indexInBounds = (array:Array<any> = [], index: number = -1): boolean => index >= 0 && index <= array.length - 1;
  player = null;
  stop = () => this.player && this.player.stop();
  render() {
    const {
      index,
      playing,
      songs,
      onRequestPlay,
      onRequestPause,
      onRequestNextTrack,
      onRequestPreviousTrack,
    } = this.props;
    const currentSong: Song = songs && this.indexInBounds(songs, index) && songs[index];
    return (
        <MusicController
          song={currentSong}
          playing={playing}
          onRequestPlay={onRequestPlay}
          onRequestPause={onRequestPause}
          onRequestNextTrack={onRequestNextTrack}
          onRequestPreviousTrack={onRequestPreviousTrack}
        />
      );
  }
}
