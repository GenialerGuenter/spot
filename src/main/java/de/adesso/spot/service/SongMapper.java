package de.adesso.spot.service;

import de.adesso.spot.model.Song;
import de.adesso.spot.persistence.SongEntity;

class SongMapper {
    static Song toSong(SongEntity entity) {
        return Song.builder()
                .titel(entity.getTitle())
                .artist(entity.getArtist())
                .length(entity.getLength())
                .build();
    }
}
