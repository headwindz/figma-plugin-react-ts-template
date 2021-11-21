import { useEffect, PropsWithChildren, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function withSocketIO(selfType, targetType) {
  return function Comp(props: PropsWithChildren<any>) {
    const [connected, setConnected] = useState(false);
    const { children } = props;
    const socketRef = useRef(null);

    useEffect(() => {
      const socket = io('http://localhost:9001');
      socketRef.current = socket;

      socket.on('connect', () => {
        socket.emit('role', selfType);
        setConnected(true);
        console.log(`Socket ${selfType} with ${socket.id} connected!`);
      });

      socket.on('disconnect', () => {
        setConnected(false);
        console.log(`Socket ${selfType} with ${socket.id} disconnected!`);
      });

      socket.on('message', message => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.src === targetType) {
          const temp = JSON.parse(parsedMessage.message);
          parent.postMessage({ pluginMessage: temp }, '*');
        }
      });
    }, []);

    const onWindowMessage = message => {
      const { data = {} } = message;
      const { pluginMessage: messageBody } = data;
      if (messageBody) {
        const msg = JSON.stringify(message.data.pluginMessage);
        if (socketRef.current.connected) {
          // send message to server for delegation
          socketRef.current.emit('message', msg);
        } else {
          setTimeout(() => {
            onWindowMessage(message);
          }, 1000);
        }
      }
    };

    useEffect(() => {
      window.addEventListener('message', onWindowMessage);

      return () => {
        window.removeEventListener('message', onWindowMessage);
      };
    }, []);

    const _children =
      typeof children === 'function' ? children(connected) : children;
    return _children;
  };
}
