export type SpotifyTrack = {
  title: string;
  artists: string;
  albumImage: string | null;
  href: string;
};

export type SpotifyNowPlaying = {
  isPlaying: boolean;
  track: SpotifyTrack | null;
};
