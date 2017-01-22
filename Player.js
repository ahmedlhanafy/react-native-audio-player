/* @flow */

import {
    Component,
    PropTypes,
} from 'react';
import { Platform } from 'react-native';
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
    toggle: () => void;
    updateProgress: Function;
    updateProgressInterval: number;
}

export default class Player extends Component<Props, void, void> {
  
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

    setInterval(() => {
      if (updateProgress && this.player && playing) {
        updateProgress(Math.max(0, this.player.currentTime) / this.player.duration);
      }
    }, updateProgressInterval);

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
    if ((!this.props.songs && nextProps.songs) || 
        (this.props.songs && this.props.songs[0].url !== nextProps.songs[0].url)) {
      if (this.player) {
        this.player.destroy();
      }
      this.player = new AudioPlayer(nextProps.songs[0].url);
    }
     if (this.props.index !== nextProps.index && (nextProps.index >= 0 && nextProps.index <= nextProps.songs.length - 1)) {
      if (this.player) {
        this.player.destroy();
      }
      this.player = new AudioPlayer(nextProps.songs[nextProps.index].url);
    //   this.player.play(this.props.play);
    }
  }

  player = null;
  stop = () => this.player.stop();
  render() { return null; }
}
