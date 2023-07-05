package de.adesso.spot.controller;

import de.adesso.spot.model.Song;
import de.adesso.spot.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
