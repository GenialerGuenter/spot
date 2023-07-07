package de.adesso.spot.persistence;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import static jakarta.persistence.GenerationType.AUTO;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "PLAYLIST")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistEntity {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = AUTO)
    private Long id;


    @ManyToMany
    @JoinTable(
            name="PLAYLIST_SONGS",
            joinColumns = @JoinColumn(name = "PLAYLIST_ID"),
            inverseJoinColumns = @JoinColumn(name = "SONG_ID")
    )
    private List<SongEntity> playlistSongs;

    @Column(name = "NAME", length = 1000, nullable = false)
    private String name;

}
