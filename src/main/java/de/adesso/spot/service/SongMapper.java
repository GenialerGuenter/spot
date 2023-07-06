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

//    static SongEntity toEntity(Song song) {
//
//        return SongEntity.builder()
//                .title(song.getTitle())
//                .artist(song.getArtist())
//                .length(song.getLength())
//                .build();
//    }
}
