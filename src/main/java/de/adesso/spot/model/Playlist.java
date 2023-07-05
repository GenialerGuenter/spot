package de.adesso.spot.model;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class Playlist {

    private List<Song> songs;
    private String name;

}
