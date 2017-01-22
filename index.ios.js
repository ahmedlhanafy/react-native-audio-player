/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
// import MusicController from './MusicController';
import Player from './Player';

const FakeData = {
  songs: [ {
    title: "'A Family That Takes 'No' For An Answer' | Modern Love 50",
    enclosure: {
      url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/KgCLbLH6NqM/BUR1524648739.mp3',
    },
  },
    {
      title: "'Taking A Break For Friendship' | Modern Love 49",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/LdTkKEBvSNY/BUR6773855232.mp3',
      },
    },
    {
      title: "Modern Love Encore: 'A Millennial's Guide To Kissing'",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/99RFZIWvc9M/BUR2443983227.mp3',
      },
    },
    {
      title: "'Beware Of Big Boxes' | Modern Love 48",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/AeEUIbsI1go/BUR4178307086.mp3',
      },
    },
    {
      title: "'Two Decembers' | Modern Love 47",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/nowwaxvLU-M/BUR8977573626.mp3',
      },
    },
    {
      title: "Modern Love Encore: 'Friends Without Benefits'",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/W1UdETq7x-o/BUR3443765723.mp3',
      },
    },
    {
      title: "'DJ's Homeless Mommy' | Modern Love 46",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/C5fEhpe49ok/BUR9623940008.mp3',
      },
    },
    {
      title: "'Fractured Beauty' | Modern Love 45",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/f8XNtmAljIc/BUR3440365451.mp3',
      },
    },
    {
      title: "'Out Of The Darkness' | Modern Love 44",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/nCxIr5NBVyI/BUR8426503362.mp3',
      },
    },
    {
      title: "'A Heart Of Gold' | Modern Love 43",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/_QBzrbPN4yM/BUR3492373827.mp3',
      },
    },
    {
      title: "'Screens Between Us' | Modern Love 42",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/N4dxIXyPhK4/BUR2163408788.mp3',
      },
    },
    {
      title: "'Modern Love Live at Town Hall' | Modern Love 41",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/EtbAkymqLZY/BUR4278790350.mp3',
      },
    },
    {
      title: "'Take Me As I Am, Whoever I Am' | Modern Love 40",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/LZASmJlOmqU/BUR7743908905.mp3',
      },
    },
    {
      title: "'Marry A Man Who Loves His Mother' | Modern Love 39",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/N1XrMjqk0o8/BUR6607939516.mp3',
      },
    },
    {
      title: "'A Path To Fatherhood' | Modern Love 38",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/fQH2oZ5qnSc/BUR7709478975.mp3',
      },
    },
    {
      title: "'The Wedding Toast' | Modern Love 37",
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/-MDVEbs8A2o/BUR2149316805.mp3',
      },
    },
    {
      title: 'Modern Love Bonus Episode: Emmy Edition',
      enclosure: {
        url: 'http://feeds.wbur.org/~r/modernlove/podcast/~5/857d4o8Yc0Q/BUR8289084033.mp3',
      },
    } ],
};

export default class AudioPlayerComponent extends Component {
  state = {
    playing: false,
    index: 0,
  }
  render() {
    const {
      playing,
      index,
    } = this.state;
        // <MusicController
        //   title={title}
        //   artist={artist}
        //   playing={playing}
        //   enableSkipForwardControl
        //   enableSkipBackwardControl
        //   skipForwardInterval={30}
        //   onRequestPlay={() => this.setState({ playing: true })}
        //   onRequestPause={() => this.setState({ playing: false })}
        // />
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({ index: index + 1 })}>
          <Text>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ playing: !playing })}>
          <Text>{playing ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ index: index - 1 })}>
          <Text>Previous</Text>
        </TouchableOpacity>

        <Player
          onRequestPlay={() => this.setState({ playing: true })}
          onRequestPause={() => this.setState({ playing: false })}
          onRequestNextTrack={() => this.setState({ index: index + 1 })}
          onRequestPreviousTrack={() => this.setState({ index: index - 1 })}
          index={index}
          playing={playing}
          songs={FakeData.songs.map(song => ({
            title: song.title,
            artist: 'Modern Love',
            artwork: 'http://is1.mzstatic.com/image/thumb/Music71/v4/8f/5d/68/8f5d68de-6ef6-98e8-8f84-91abc2e3cfc4/source/600x600bb.jpg',
            url: song.enclosure.url,
          }))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
  },
});

AppRegistry.registerComponent('AudioPlayerComponent', () => AudioPlayerComponent);
