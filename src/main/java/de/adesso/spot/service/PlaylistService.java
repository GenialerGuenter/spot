package de.adesso.spot.service;

import de.adesso.spot.model.Playlist;
import de.adesso.spot.persistence.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PlaylistService {

    private final PlaylistRepository repository;

    public List<Playlist> getAllPlaylists(){
        return repository.findAll()
                .stream()
                .map(PlaylistMapper::toPlaylist)
                .toList();
    }

}
