package de.adesso.spot.service;

import de.adesso.spot.model.Song;
import de.adesso.spot.persistence.SongEntity;

class SongMapper {
    static Song toSong(SongEntity entity) {
        return Song.builder()
                .title(entity.getTitle())
                .artist(entity.getArtist())
                .length(entity.getLength())
                .build();
    }

    static SongEntity toEntity(Song song) {
        SongEntity newEntity = new SongEntity();
        newEntity.setArtist(song.getArtist());
        newEntity.setTitle(song.getTitle());
        newEntity.setLength(song.getLength());
        return newEntity;
    }
}
