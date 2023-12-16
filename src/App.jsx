import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Cross from './assets/cross.png'
import Circle from './assets/circle.png'
import Pencil from './assets/pencil.png'
import Snackbar from 'react-native-snackbar'


export default function App() {

  const [winner, setWinner] = useState("");
  const [isCross, setIsCross] = useState(false);
  const [gameBoard, setGameBoard] = useState(new Array(9).fill('empty', 0, 9));

  const chkWinner = () => {
    if (gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2] && gameBoard[0] !== 'empty') setWinner(`${isCross ? 'Cross' : 'Circle'} , won the game`)

    if (gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5] && gameBoard[3] !== 'empty') setWinner(`${isCross ? 'Cross' : 'Circle'} , won the game`)

    if (gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8] && gameBoard[6] !== 'empty') setWinner(`${isCross ? 'Cross' : 'Circle'} , won the game`)

    if (gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[0] !== 'empty') setWinner(`${isCross ? 'Cross' : 'Circle'} , won the game`)

    if (gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[1] !== 'empty') setWinner(`${isCross ? 'Cross' : 'Circle'} , won the game`)

    if (gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8] && gameBoard[2] !== 'empty') setWinner(`${isCross ? 'Cross' : 'Circle'} , won the game`)

    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] !== 'empty') setWinner(`${isCross ? 'Cross' : 'Circle'} , won the game`)

    if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[2] !== 'empty') setWinner(`${isCross ? 'Cross' : 'Circle'} , won the game`)

    

  }

  const handleClick = (index) => {
    if (!winner) {
      if (gameBoard[index] === 'empty') {
        gameBoard[index] = isCross ? 'cross' : 'circle'
        chkWinner()

        setIsCross(!isCross)
      } else {
        Snackbar.show({
          text: "Already filled",
          duration: 3000
        })
      }
    } else {
      Snackbar.show({
        text: winner,
        duration: 3000
      })
    }
  }

  const reloadGame = () => {
    setWinner("");
    setGameBoard(gameBoard.fill('empty', 0, 9));
    setIsCross(false);
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#ffffff', width: '100%', height: '100%', gap: 50 }}>

      <View style={[styles.headerContainer, winner ? { backgroundColor: '#81c784' } : isCross ? { backgroundColor: '#90caf9' } : { backgroundColor: '#ffb74d' }]}>
        {
          !winner ?
            <Text style={[styles.playerInfo, isCross ? styles.crossPlayer : styles.circlePlayer]}>Player {isCross ? <Image style={{ width: 32, height: 32 }} source={Cross} /> : <Image style={{ width: 32, height: 32 }} source={Circle} />}'s Turn
            </Text>
            :
            <Text style={styles.winnerInfo}>{winner}</Text>
        }
      </View>

      <View style={styles.gameBoard}>
        <FlatList

          numColumns={3}
          keyExtractor={(item, index) => index}
          data={gameBoard}
          renderItem={(item) => (
            <Pressable
              onPress={() => { handleClick(item.index) }}
            >
              {item.item === 'empty' ?
                <View style={styles.gameBoardElem}>
                  <Image width={{ height: 32, width: 32 }} source={Pencil} />
                </View>
                :
                <View style={styles.gameBoardElem}>
                  {item.item === 'cross' ?
                    <Image style={{ width: 32, height: 32 }} source={Cross} />
                    :
                    <Image style={{ width: 32, height: 32 }} source={Circle} />
                  }
                </View>}
            </Pressable>
          )}
        />


      </View>


      <Pressable style={styles.button} onPress={reloadGame}>
        <Text style={styles.btnTxt}>{!winner ? "Reload Game" : "Start New Game"}</Text>
      </Pressable>





    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '95%',
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerInfo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  crossPlayer: {
    color: "#0d47a1"
  },
  circlePlayer: {
    color: 'red'
  },
  winnerInfo: {
    color: '#2e7d32',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#81c784'
  },
  gameBoard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '35%'
  },
  gameBoardElem: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dashed'
  },
  button: {
    backgroundColor: '#81c784',
    alignSelf: 'center',
    padding: 10,
    width: '80%',
    borderRadius: 12
  },
  btnTxt: {
    color: '#2e7d32',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24
  }
})