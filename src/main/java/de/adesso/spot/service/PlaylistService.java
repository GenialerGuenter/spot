package de.adesso.spot.service;

import de.adesso.spot.model.Playlist;
import de.adesso.spot.persistence.PlaylistEntity;
import de.adesso.spot.persistence.PlaylistRepository;
import de.adesso.spot.persistence.SongEntity;
import de.adesso.spot.persistence.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final SongRepository songRepository;

    public Playlist updatePlaylist(Long playlistId, Long songId) {
        Optional<PlaylistEntity> playlistEntity = playlistRepository.findById(playlistId);
        if (playlistEntity.isEmpty()) {
            throw new RuntimeException();
        }

        PlaylistEntity playlist = playlistEntity.get();

        Optional<SongEntity> songEntity = songRepository.findById(songId);
        if (songEntity.isEmpty()) {
            throw new RuntimeException();
        }
        SongEntity song = songEntity.get();

        playlist.addSong(song);

        return PlaylistMapper.toPlaylist(playlist);
    }

    public Playlist createNewPlaylist(Playlist newPlaylist){
        return PlaylistMapper.toPlaylist(playlistRepository.save(PlaylistMapper.toEntity(newPlaylist)));
    }

    public List<Playlist> getAllPlaylists(){
        return playlistRepository.findAll()
                .stream()
                .map(PlaylistMapper::toPlaylist)
                .toList();
    }

}
