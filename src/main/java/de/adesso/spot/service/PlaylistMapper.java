package de.adesso.spot.service;

import de.adesso.spot.model.Playlist;
import de.adesso.spot.persistence.PlaylistEntity;

class PlaylistMapper {
    static Playlist toPlaylist(PlaylistEntity entity) {
        return Playlist.builder()
                .songs(entity.getPlaylistSongs().stream().map(SongMapper::toSong).toList())
                .name(entity.getName())
                .build();
    }
}
