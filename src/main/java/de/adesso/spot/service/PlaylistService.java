package de.adesso.spot.service;

import de.adesso.spot.model.Playlist;
import de.adesso.spot.model.Song;
import de.adesso.spot.persistence.PlaylistRepository;
import de.adesso.spot.persistence.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final SongRepository songRepository;

//    public Playlist updatePlaylist(Playlist playlist, Song song){
//        if(songRepository.existsSongEntityByArtistAndTitleAndLength(song.getArtist(), song.getTitle(), song.getLength())){
//            return PlaylistMapper.toPlaylist(playlistRepository.save(playlistRepository.))
//        }
//        return playlist;
//    }

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
