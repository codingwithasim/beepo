let audio: HTMLAudioElement | null = null;

export function playAlarm() {
  if (!audio) {
    audio = new Audio("/sounds/aud_01.wav");
  }

  audio.currentTime = 0;
  audio.play().catch(() => {
    // Browser may block playback if there hasn't been user interaction
  });
}