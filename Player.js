/* @flow */

import {
    PureComponent,
    PropTypes,
} from 'react';
import { Player as AudioPlayer } from 'react-native-audio-toolkit';

type Song = {
    title: string;
    artist: string;
    songArtwork: string;
    url: string;
}

type Props = {
    songs: Array<Song>;
    index: number;
    playing: boolean;
    toggle?: () => void;
    updateProgress?: Function;
    updateProgressInterval: number;
}

type DefaultProps = {
  index: number;
  updateProgressInterval: number;
};

export default class Player extends PureComponent<DefaultProps, Props, void> {

  static propTypes = {
    songs: PropTypes.arrayOf(PropTypes.shape({
      artist: PropTypes.string,
      title: PropTypes.string.isRequired,
      songArtwork: PropTypes.string,
      url: PropTypes.string.isRequired,
    })),
    index: PropTypes.number,
    playing: PropTypes.bool,
    toggle: PropTypes.func,
    updateProgress: PropTypes.func,
    updateProgressInterval: PropTypes.number,
  }

  static defaultProps = {
    index: 0,
    updateProgressInterval: 1000,
  };

  componentDidMount() {
    const {
          songs,
          index,
          updateProgress,
          updateProgressInterval,
          playing,
      } = this.props;

    if (songs) {
      this.player = new AudioPlayer(songs[index].url);
    }

    if (updateProgress) {
      setInterval(() => {
        if (this.player && playing) {
          updateProgress(Math.max(0, this.player.currentTime) / this.player.duration);
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
      songs,
      index,
    } = this.props;
    const {
      songs: nextSongs,
      index: nextIndex,
      playing: nextPlaying,
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
  render() { return null; }
}
