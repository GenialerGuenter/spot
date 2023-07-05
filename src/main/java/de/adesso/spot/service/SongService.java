package de.adesso.spot.service;

import de.adesso.spot.model.Song;
import de.adesso.spot.persistence.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SongService {

    private final SongRepository repository;

    public List<Song> getAllSongs() {
        return repository.findAll()
                .stream()
                .map(SongMapper::toSong)
                .toList();
    }

}
