package de.adesso.spot.controller;

import de.adesso.spot.model.Playlist;
import de.adesso.spot.model.Song;
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

//    @PutMapping()
//    Playlist updateSong(@RequestBody Playlist playlist, Song song){ return service.updatePlaylist(playlist, song); }

    @PostMapping()
    Playlist postSong(@RequestBody Playlist newPlaylist){ return service.createNewPlaylist(newPlaylist); }

    @GetMapping
    List<Playlist> getAllPlaylists(){ return service.getAllPlaylists(); }

}
