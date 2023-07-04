package de.adesso.spot.controller;

import de.adesso.spot.model.Song;
import de.adesso.spot.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/song")
@RestController
class SongController {

    private final SongService service;

    @GetMapping
    List<Song> getAllSongs() {
        return service.getAllSongs();
    }

}
