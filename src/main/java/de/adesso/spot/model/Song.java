package de.adesso.spot.model;

import lombok.*;

@Builder
@Getter
public class Song {

    private Long id;
    private String title;
    private String artist;
    private int length;

}
