package de.adesso.spot.service;

import de.adesso.spot.model.Song;
import de.adesso.spot.persistence.SongEntity;
import de.adesso.spot.persistence.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class SongService {

    private final SongRepository repository;

    public Song createNewSong(Song newSong) {
        return SongMapper.toSong(repository.save(SongMapper.toEntity(newSong)));
    }

    @Transactional(readOnly = true)
    public List<Song> getAllSongs() {
        return repository.findAll()
                .stream()
                .map(SongMapper::toSong)
                .toList();
    }
}
