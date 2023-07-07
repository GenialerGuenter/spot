package de.adesso.spot.persistence;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "SONG")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SongEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
