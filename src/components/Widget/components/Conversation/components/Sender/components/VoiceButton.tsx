/// <reference types="@types/dom-speech-recognition" />

import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useSelector } from '@selectors';
import './VoiceButton.scss';
import Img from '@components/Img';
import { VoicePopupRef } from './VoicePopup';

const microphone = require('@assets/microphone.svg') as string;
const microphoneActive = require('@assets/microphone-active.svg') as string;


export type CProps = {
  onChange: (text: string, isFinal: boolean) => void;
  popupRef?: React.RefObject<VoicePopupRef>;
}

const useVoiceToText = () => {
  const locale = useSelector(({ messages }) => messages?.voiceLocale);
  const [listening, setListening] = useState(false);
  const [text, setText] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [isFinal, setIsFinal] = useState(false);

  let recognition = useRef<SpeechRecognition>();

  useEffect(() => {
    try {
      if (locale && window.webkitSpeechRecognition) {
        const r = new window.webkitSpeechRecognition();

        r.continuous = true;
        r.interimResults = true;
        r.lang = locale;

        r.addEventListener('start', () => {
          setListening(true);
        });

        r.addEventListener('result', (event) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }
          setText(finalTranscript || interimTranscript);
          if (finalTranscript) {
            setIsFinal(true);
          }
        });

        r.addEventListener('end', () => {
          setListening(false);
        });

        r.addEventListener('error', (error) => {
          console.error('Speech recognition error:', error);
          setListening(false);
        });

        recognition.current = r;
        setIsSupported(true);
      } else {
        console.error('SpeechRecognition is not supported in this browser.');
      }
    } catch (e) {
      console.error('Speech recognition error:', e);
    }

    return () => {
      const r = recognition.current;
      if (r) {
        r.stop();
      }
    };
  }, [locale]);

  const start = async () => {
    const r = recognition.current;
    if (r) {
      try {
        r.start();
        setIsFinal(false);
      } catch (e) {
        console.error(e);
        r.abort();
      }
    }
  };

  const stop = () => {
    const r = recognition.current;
    if (r) {
      try {
        r.stop();
      } catch (e) {
        console.error(e);
        r.abort();
      }
    }
  };

  const resetText = () => {
    setText('');
  };

  return { isSupported, listening, start, stop, text, resetText, isFinal };
};

const useClickAndHold = (callback: (() => void) | null = null, duration = 500) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const mouseDownTs = useRef<null | number>(null);
  const holdTimer = useRef<NodeJS.Timeout>();

  const onClick = () => {
    if (isClicked || isHolding) {
      setIsHolding(false);
      setIsClicked(false);
      return;
    }
    setIsHolding(true);
    setIsClicked(true);
  };

  const onMouseDown = () => {
    mouseDownTs.current = Date.now();
    holdTimer.current = setTimeout(() => {
      setIsHolding(true);
      if (callback) {
        callback();
      }
    }, duration);
  };

  const onMouseUp = () => {
    if (isClicked) {
      return onClick();
    }
    if (mouseDownTs.current) {
      const mountDownIn = Date.now() - mouseDownTs.current;
      mouseDownTs.current = null;
      if (mountDownIn < 1000) {
        return onClick();
      }
    }
    clearTimeout(holdTimer.current);
    if (isHolding) {
      setIsHolding(false);
    }
  };

  const onMouseLeave = () => {
    if (!isClicked) {
      return;
    }
    clearTimeout(holdTimer.current);
    if (isHolding) {
      setIsHolding(false);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(holdTimer.current);
    };
  }, [isHolding, callback, duration]);

  return { isHolding, onMouseDown, onMouseUp, onMouseLeave };
};

const VoiceButton = ({ onChange, popupRef }: CProps) => {
  const {
    text,
    listening,
    resetText,
    isSupported,
    start: startListening,
    stop: stopListening,
    isFinal
  } = useVoiceToText();

  useEffect(() => {
    if (!text) {
      return;
    }
    onChange(text, isFinal);
  }, [text, isFinal]);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const { isHolding, ...mouseProps } = useClickAndHold();

  useEffect(() => {
    if (isHolding) {
      popupRef?.current?.init();
      Promise.all([
        startListening(),
        popupRef?.current?.start()
      ]);
    } else {
      stopListening();
      popupRef?.current?.stop();
    }
  }, [isHolding]);

  if (!isSupported) {
    return null;
  }

  return (
    <button type="submit" className={cn('rcw-micro', { active: isHolding })} {...mouseProps}>
      <Img src={isHolding ? microphoneActive : microphone} className="rcw-micro-icon" />
    </button>
  );
};

export default VoiceButton;
