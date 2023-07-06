package de.adesso.spot.model;

import lombok.*;

@Builder
@Getter
public class Song {

    private String title;
    private String artist;
    private int length;

}
