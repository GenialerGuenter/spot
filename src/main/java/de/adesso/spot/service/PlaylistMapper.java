package de.adesso.spot.service;

import de.adesso.spot.model.Playlist;
import de.adesso.spot.model.Song;
import de.adesso.spot.persistence.PlaylistEntity;
import de.adesso.spot.persistence.SongEntity;

import java.util.ArrayList;
import java.util.List;

class PlaylistMapper {

    static Playlist toPlaylist(PlaylistEntity entity) {
        return Playlist.builder()
                .songs(entity.getPlaylistSongs().stream().map(SongMapper::toSong).toList())
                .name(entity.getName())
                .id(entity.getId())
                .build();
    }

    static PlaylistEntity toEntity(Playlist playlist) {
        PlaylistEntity newEntity = new PlaylistEntity();
        newEntity.setName(playlist.getName());
        newEntity.setPlaylistSongs(new ArrayList<SongEntity>());
        return newEntity;
    }
}
