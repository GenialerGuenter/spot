package de.adesso.spot.service;

import de.adesso.spot.model.Playlist;
import de.adesso.spot.model.Song;
import de.adesso.spot.persistence.PlaylistEntity;
import de.adesso.spot.persistence.PlaylistRepository;
import de.adesso.spot.persistence.SongEntity;
import de.adesso.spot.persistence.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final SongRepository songRepository;

    public Playlist deleteSong(Long playlistId, Long songId){
        PlaylistEntity playlist = checkEntity(playlistId);

        SongEntity song = checkSong(songId);

        playlist.deleteSong(song);

        playlistRepository.save(playlist);
        return PlaylistMapper.toPlaylist(playlist);
    }

    public Playlist deletePlaylist(Long playlistId){
        PlaylistEntity playlist = checkEntity(playlistId);
        playlistRepository.delete(playlist);
        return PlaylistMapper.toPlaylist(playlist);
    }

    public Playlist updatePlaylist(Long playlistId, Long songId) {
        PlaylistEntity playlist = checkEntity(playlistId);

        SongEntity song = checkSong(songId);

        playlist.addSong(song);

        playlistRepository.save(playlist);

        return PlaylistMapper.toPlaylist(playlist);
    }

    public Playlist createNewPlaylist(Playlist newPlaylist){
        return PlaylistMapper.toPlaylist(playlistRepository.save(PlaylistMapper.toEntity(newPlaylist)));
    }

    @Transactional(readOnly = true)
    public List<Playlist> getAllPlaylists(){
        return playlistRepository.findAll()
                .stream()
                .map(PlaylistMapper::toPlaylist)
                .toList();
    }

    private PlaylistEntity checkEntity(Long playlistId){
        Optional<PlaylistEntity> playlistEntity = playlistRepository.findById(playlistId);
        if (playlistEntity.isEmpty()) {
            throw new RuntimeException();
        }
        return playlistEntity.get();
    }

    private SongEntity checkSong(Long songId){
        Optional<SongEntity> songEntity = songRepository.findById(songId);
        if (songEntity.isEmpty()) {
            throw new RuntimeException();
        }
        return songEntity.get();
    }
}
