package de.adesso.spot.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

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

}
