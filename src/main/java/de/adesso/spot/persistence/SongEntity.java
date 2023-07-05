package de.adesso.spot.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "SONG")
@Getter
@Setter
public class SongEntity {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "TITLE", length = 1000, nullable = false)
    private String title;

    @Column(name = "ARTIST", length = 1000, nullable = false)
    private String artist;

    @Column(name = "LENGTH", nullable = false)
    private Integer length;

    @ManyToMany(mappedBy = "playlistSongs")
    private List<PlaylistEntity> playlists;

}
