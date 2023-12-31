package de.adesso.spot.controller;

import de.adesso.spot.model.Playlist;
import de.adesso.spot.model.Song;
import de.adesso.spot.persistence.SongEntity;
import de.adesso.spot.persistence.SongRepository;
import de.adesso.spot.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/playlist")
@RestController
public class PlaylistController {

    private final PlaylistService service;

    @PutMapping("/{playListId}/add-song")
    Playlist updateSongs(@PathVariable("playListId") Long playlistId, @RequestBody Long songId){
        return service.updatePlaylist(playlistId, songId);
    }

    @PutMapping("/{playListId}/delete-song")
    Playlist deleteSong(@PathVariable("playListId") Long playlistId, @RequestBody Long songId){
        return service.deleteSong(playlistId, songId);
    }

    @PutMapping("/{playListId}/delete-playlist")
    Playlist deletePlaylist(@PathVariable("playListId") Long playlistId){
        return service.deletePlaylist(playlistId);
    }

    @PostMapping()
    Playlist postSong(@RequestBody Playlist newPlaylist){ return service.createNewPlaylist(newPlaylist); }

    @GetMapping
    List<Playlist> getAllPlaylists(){ return service.getAllPlaylists(); }

}
