import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from "react-native";

const LOCAL_NOTIFICATION = 'NanoDegree:mobileFlashcards';

/**
 * Notification object
 */
const createNotification = () => {
  return {
    title: 'Log your stats!',
    body: "Don't forget to completed at least one quiz today",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      stick: false,
      vibrate: true
    }
  };
};

/**
 * Handling Notification permission request and notification storage
 */
export const setLocalNotification = () => {
  AsyncStorage.getItem(LOCAL_NOTIFICATION)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({
          status
        }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            });

            AsyncStorage.setItem(LOCAL_NOTIFICATION, JSON.stringify(true));
          }
        });
      }
    })
}

/**
 * Clear scheduled notification if the user has completed at least a test per day
 */
export const clearAllLocalNotification = () => {
  return AsyncStorage.removeItem(LOCAL_NOTIFICATION).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}