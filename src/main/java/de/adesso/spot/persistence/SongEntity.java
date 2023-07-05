package de.adesso.spot.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "SONG")
@Getter
@Setter
public class SongEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
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
