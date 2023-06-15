
import * as React from "react";

import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";
import { GestureEvent, PanGestureHandler } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/GestureEventType";
import Snake from "./Snake"

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    // const [food, setFood] = React.useState<Coordinate[]>(FOOD_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    
    const HandleGesture = (event: GestureEventType) => {
        // console.log("Eventsss", event);
        const { translationX, translationY } = event.nativeEvent;
        console.log("X: ", translationX, "Y: ", translationY);
        
        if (Math.abs(translationX) > Math.abs(translationY)) {
            // moving on X axe
            if (translationX > 0) {
                // moving to the right side;
                setDirection(Direction.Right);
            }
            else {
                setDirection(Direction.Left);
                // moving to the left side;
            }
            if (translationY > 0) {
                // moving down
                setDirection(Direction.Down);
            }
            else {
                setDirection(Direction.Up);
            }
            console.log("Snake: ", snake)
        }
    };

//     return (
//         <PanGestureHandler onGestureEvent={HandleGesture}>
//             <SafeAreaView style={styles.container}>
//                 <View  style={styles.boundaries} >
//                     <Snake snake={snake} />
//                 </View>
//             </SafeAreaView>
//         </PanGestureHandler>
//     );
// }
return (
    <PanGestureHandler onGestureEvent={HandleGesture}>
      <SafeAreaView style={styles.container}>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        // secondaryColor: Colors.secondary,
    },
    boundaries: {
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background,
    },
});

