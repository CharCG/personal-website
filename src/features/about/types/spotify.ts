export type SpotifyTrack = {
  title: string;
  artists: string;
  albumImage: string | null;
  href: string;
};

export type SpotifyRecentlyPlayed = {
  tracks: SpotifyTrack[];
};
