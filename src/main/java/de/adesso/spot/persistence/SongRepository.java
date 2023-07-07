package de.adesso.spot.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<SongEntity, Long> {
    boolean existsSongEntityByArtistAndTitleAndLength(String artist, String title, Integer length);
}
