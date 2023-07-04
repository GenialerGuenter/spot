package de.adesso.spot.service;

import de.adesso.spot.model.Song;
import de.adesso.spot.persistence.SongEntity;
import de.adesso.spot.persistence.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SongService {

    private final SongRepository repository;

    public List<Song> getAllSongs() {
//        Collection<Song> songs = new ArrayList<>();
//        List<SongEntity> entities = repository.findAll();
//        for (SongEntity entity : entities) {
//            Song song = SongMapper.toSong(entity);
//            songs.add(song);
//        }
//        return songs;

        return repository.findAll()
                .stream()
                .map(SongMapper::toSong)
                .toList();
    }

    private static class SongMapper {
        static Song toSong(SongEntity entity) {
            return Song.builder()
                    .titel(entity.getTitle())
                    .artist(entity.getArtist())
                    .length(entity.getLength())
                    .build();
        }
    }

}
