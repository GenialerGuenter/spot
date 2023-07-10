package de.adesso.spot.service;

import de.adesso.spot.model.Playlist;
import de.adesso.spot.model.Song;
import de.adesso.spot.persistence.PlaylistEntity;
import de.adesso.spot.persistence.SongEntity;
import de.adesso.spot.persistence.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class SongService {

    private final SongRepository repository;

    public Song createNewSong(Song newSong) {
        return SongMapper.toSong(repository.save(SongMapper.toEntity(newSong)));
    }

    public Song deleteSong(Long songId){
        Optional<SongEntity> songEntity = repository.findById(songId);
        if (songEntity.isEmpty()) {
            throw new RuntimeException();
        }

        SongEntity song = songEntity.get();
        repository.delete(song);
        return SongMapper.toSong(song);
    }

    @Transactional(readOnly = true)
    public List<Song> getAllSongs() {
        return repository.findAll()
                .stream()
                .map(SongMapper::toSong)
                .toList();
    }
}
