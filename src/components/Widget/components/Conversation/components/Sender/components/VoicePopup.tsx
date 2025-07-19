import './VoicePopup.scss';
import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Record from 'wavesurfer.js/dist/plugins/record';
import cn from 'classnames';

export type VoicePopupRef = {
  init(): void;
  start(): Promise<void>;
  stop(): void;
}

export type CProps = {
  apiRef: React.MutableRefObject<VoicePopupRef | null>;
}

const VoicePopup = ({ apiRef }: CProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const recordRef = useRef<Record | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isActive, setIsActive] = React.useState(false);

  useEffect(() => {
    if (!ref.current || !apiRef) {
      return;
    }
    const { clientHeight, clientWidth } = ref.current;
    apiRef.current = {
      init: () => {
        if (!recordRef.current) {
          recordRef.current = Record.create({
            scrollingWaveform: true
          });
        }
        waveSurferRef.current = WaveSurfer.create({
          container: ref.current!,
          height: clientHeight,
          width: clientWidth - 40,
          barWidth: 2,
          barRadius: 2,
          // barGap: 2,
          cursorWidth: 0,
          interact: false,
          plugins: [
            recordRef.current
          ]
        });
        setIsActive(true);
      },
      start: async () => {
        await recordRef.current?.startMic();
      },
      stop: () => {
        if (recordRef.current) {
          recordRef.current.stopMic();
          recordRef.current.destroy();
          recordRef.current = null;
        }
        if (waveSurferRef.current) {
          waveSurferRef.current.destroy();
          waveSurferRef.current = null;
        }
        setIsActive(false);
      }
    };
  }, [ref, apiRef]);

  return (
    <div className={cn('rcw-voice-popup', { active: isActive })}>
      <div className="rcw-voice-popup-container" ref={ref} />
    </div>
  );
};

export default VoicePopup;
