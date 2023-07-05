package de.adesso.spot.persistence;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "PLAYLIST")
@Getter
@Setter
public class PlaylistEntity {

    @Id
    @Column(name = "ID")
    private Long id;

    @ManyToMany
    @JoinTable(
            name="PLAYLIST_SONGS",
            joinColumns = @JoinColumn(name = "SONG_ID"),
            inverseJoinColumns = @JoinColumn(name = "PLAYLIST_ID")
    )
    private List<SongEntity> playlistSongs;

    @Column(name = "NAME", length = 1000, nullable = false)
    private String name;

}
