import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import MusicControl from 'react-native-music-control';

export default class MusicController extends PureComponent{
    static defaultProps = {
        title: '',
        artwork: 'https://yt3.ggpht.com/0v8T0CTAv8VPxA5lJtz-tqJe-tR-3VQc0ONhD6Az2RWjNRnwh5QQzPYz5I7wbYljU_tQjZ2ok2W59_v_=s900-nd-c-c0xffffffff-rj-k-no',
        artist: '',
        album: '',
        genre: '',
        duration: 0,
        description: '',
        color: 0x444444,
        date: '1983-01-02T00:00:00Z',
        rating: 0,
        enableStopControl: false,
        enableNextTrackControl: true,
        enablePreviousTrackControl: true,
        enableSkipForwardControl: false,
        enableSkipBackwardControl: false,
        skipForwardInterval: 30,
        skipBackwardInterval: 15,
        pkaying: false,
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
            onRequestPlay && onRequestPlay();
        })

        MusicControl.on('pause', () => {
            onRequestPause && onRequestPause();
        })

        MusicControl.on('stop', () => {
            onRequestStop && onRequestStop();
        })

        MusicControl.on('nextTrack', () => {
            onRequestNextTrack && onRequestNextTrack();
        })

        MusicControl.on('previousTrack', () => {
            onRequestPreviousTrack && onRequestPreviousTrack();
        })

        // MusicControl.on('seekForward', () => {});
        // MusicControl.on('seekBackward', () => {});

        // MusicControl.on('seek', (pos)=> {}); // Android only (Seconds)
        // MusicControl.on('rate', (rating)=> {}); // Android only (Percentage)
        // MusicControl.on('volume', (volume)=> {}); // Android only (Percentage)
        // MusicControl.on('togglePlayPause', () => {}); // iOS only

        MusicControl.on('skipForward', () => {
            onRequestSkipForward && onRequestSkipForward();
        }); // iOS only
        MusicControl.on('skipBackward', () => {
            onRequestSkipBackward && onRequestSkipBackward();
        }); // iOS only
    }
    render() {
        const {
            title,
            artwork,
            artist,
            album,
            genre,
            duration,
            description,
            color,
            date,
            rating,
            enableStopControl,
            enableNextTrackControl,
            enablePreviousTrackControl,
            enableSkipForwardControl,
            enableSkipBackwardControl,
            skipForwardInterval,
            skipBackwardInterval,
            playing,
        } = this.props;
        MusicControl.enableControl('play', true);
        MusicControl.enableControl('pause', true);
        MusicControl.enableControl('stop', enableStopControl);
        MusicControl.enableControl('nextTrack', enableNextTrackControl);
        MusicControl.enableControl('previousTrack', enablePreviousTrackControl);
        MusicControl.enableControl('skipForward', enableSkipForwardControl, {interval: skipForwardInterval}); // iOS only
        MusicControl.enableControl('skipBackward', enableSkipBackwardControl, {interval: skipBackwardInterval}); // iOS only
        // MusicControl.enableControl('seekForward', true);
        // MusicControl.enableControl('seekBackward', true);
        // MusicControl.enableControl('seek', true) // Android only
        // MusicControl.enableControl('rate', true) // Android only
        // MusicControl.enableControl('volume', false) // Android only
        
        MusicControl.setNowPlaying({
            title,
            artwork,
            artist,
            album,
            genre,
            duration,
            description,
            color,
            date,
            rating,
        });
        if (Platform.OS === 'android') {
            MusicControl.setPlayback({
                state: playing? MusicControl.STATE_PLAYING: MusicControl.STATE_PAUSED, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
                // volume: 100, // (Percentage)
                // speed: 1, // Playback Rate
                // elapsedTime: 103, // (Seconds)
                // bufferedTime: 200 // (Seconds)
            });
        }
        return null;
    }
}