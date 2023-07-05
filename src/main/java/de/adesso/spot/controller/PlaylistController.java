package de.adesso.spot.controller;

import de.adesso.spot.model.Playlist;
import de.adesso.spot.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/playlist")
@RestController
public class PlaylistController {

    private final PlaylistService service;

    @GetMapping
    List<Playlist> getAllPlaylists(){ return service.getAllPlaylists(); }

}
